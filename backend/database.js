// load environment variable from .env file 
require('dotenv').config();

// set up mongoDB ... initialize mongodb client with URI 
const { MongoClient } = require('mongodb');
const dbName = 'FormInputs';
const client = new MongoClient(process.env.MONGODB_URI);




// asynchronously connect to mongoDB database 
async function connect() {
    try {
        await client.connect();
        console.log('Connected');
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Failed to connect', err);
        process.exit(1);
    }
}

// take in username and password, connect to database
// then insert document in profileInfo collection 
// log number of inserted documents for testing for how many users were added 
async function insertAccountData(user, pass) {
    const db = await connect();
    const collection = db.collection('ProfileInfo');
    const existing = await collection.findOne({ username: user });
    if (existing) {
        throw new Error('Username already exists');
    }
    try {
        const result = await collection.insertOne({ username: user, password: pass});
        console.log(`${result.insertedCount} documents were inserted`);
    } catch(error) {
        throw new Error(error);
    }
}

// this gives you all the profile data as an array 
// can be used in other parts of interaction 
async function fetchAccountData() {
    const db = await connect();
    const collection = db.collection('ProfileInfo');

    try {
        const data = await collection.find({}).toArray(); 
        return data; 
    }  catch (error) {
        throw new Error(error);
    }
}




module.exports = { connect, insertAccountData, fetchAccountData, client};