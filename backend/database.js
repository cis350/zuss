/* eslint-disable global-require */
// load environment variable from .env file
if (process.env.NODE_ENV === 'test') {
  console.log('testing');
  require('dotenv').config({ path: '.env.test' });
} else {
  console.log('not testing');
  require('dotenv').config();
}

// set up mongoDB ... initialize mongodb client with URI
const { MongoClient } = require('mongodb');

const dbName = 'FormInputs';
console.log(`connecting to ${process.env.MONGODB_URI}`);
const client = new MongoClient(process.env.MONGODB_URI);
console.log('connected!');

// hi can you see this
// this is actually so cool !!
// where is your .env file? the non test one
// IT WORKSSSS
// wait jk it doesnt but ya omg its so magical
// rn its in the root directory but she's been moving around

/**
 * Asynchronously connects to the MongoDB database
 *
 * @returns {Promise}
 * @throws Throws error if connection to database fails to connect
 */

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

/**
 * Inserts a new account document into the ProfileInfo collection.
 *
 * @param {string} user Account's username
 * @param {string} pass  Accounts's password
 * @returns {Promise}
 * @throws {Error} Throws an error if the username already exists or if the insert fails
 */

// take in username and password, connect to database
async function insertAccountData(user, pass) {
  const db = await connect();
  const collection = db.collection('ProfileInfo');
  const existing = await collection.findOne({ username: user });

  if (existing) {
    throw new Error('Username already exists');
  }
  // then insert document in profileInfo collection
  try {
    const result = await collection.insertOne({ username: user, password: pass });
    // log number of inserted documents for testing for how many users were added
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetches all account data from the ProfileInfo collection.
 *
 * @returns {Promise}
 * @throws {Error} Throws an error if fetching the data fails
 */

// this gives you all the profile data as an array
// can be used in other parts of interaction
async function fetchAccountData() {
  const db = await connect();
  const collection = db.collection('ProfileInfo');

  try {
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
async function insertEventData(eventName, eventDate, eventLocation, eventDescription, eventOrganizer, eventImage) {
  const db = await connect();
  const collection = db.collection('Events');
  const existingName = await collection.findOne({ name: eventName });
  const existingDate = await collection.findOne({ date: eventDate });
  const existingLocation = await collection.findOne({ location: eventLocation });
  const existingDescription = await collection.findOne({ description: eventDescription });
  const existingOrganizer = await collection.findOne({ organization: eventOrganizer });

  if (existingName && existingDate && existingLocation && existingDescription
    && existingOrganizer) {
    throw new Error('Event already exists');
  }
  // then insert document in Events collection
  try {
    const result = await collection.insertOne({
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
      organization: eventOrganizer,
      image: eventImage
    });
    // log number of inserted documents for testing for
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    throw new Error(error);
  }
}
async function fetchEventData(eventName) {
  const db = await connect();
  const collection = db.collection('Events');
  try {
    const event = await collection.findOne({ name: eventName });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw new Error(error);
  }
}

async function fetchEvents() {
  const db = await connect();
  const collection = db.collection('Events');

  try {
    const data = await collection.find({}).toArray();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function fetchEventsFiltered(eventName, organizations){
  const db = await connect();
  const collection = db.collection('Events');

  try {
    // in mongodb, get all events that contain name and organization in organizations
    console.log("eventName ", eventName)
    const data = await collection.find({ name: { $regex: eventName, $options: "i" }, organization: { $in: organizations } }).toArray();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function close() {
  await client.close();
}

module.exports = {
  connect, insertAccountData, insertEventData, fetchAccountData, fetchEvents, fetchEventData, fetchEventsFiltered, client, close,
};
