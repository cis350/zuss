const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://exi03:GTwzDG9pK4FDDJmG@zuss.snmyvzd.mongodb.net/';
const dbName = 'FormInputs';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
    try {
        await client.connect();
        console.log('Connected');
        const db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Failed to connect', err);
        // eslint-disable-next-line no-undef
        process.exit(1);
    }
}
async function insertSampleData() {
    const db = await connect();
    const collection = db.collection('Clubs');

    const sampleData = [
        { clubName: 'WUEC', eventName: 'Pitch Night' },
        { clubName: 'WiCS', eventName: 'Networking' },
    ];

    try {
        const result = await collection.insertMany(sampleData);
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}

async function fetchClubsData() {
    const db = await connect();
    const collection = db.collection('Clubs');

    try {
        const data = await collection.find({}).toArray(); 
        return data; 
    } finally {
        await client.close();
    }
}

module.exports = { connect, insertSampleData, fetchClubsData};
