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
const client = new MongoClient(process.env.MONGODB_URI);
console.log('connected!');

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

/**
 * Inserts event data into the 'Events' collection in the database.
 * 
 * @async
 * @function insertEventData
 * @param {string} eventName - The name of the event.
 * @param {string} eventDate - The date of the event.
 * @param {string} eventLocation - The location of the event.
 * @param {string} eventDescription - The description of the event.
 * @param {string} eventOrganizer - The organizer of the event.
 * @param {string} eventImage - The image URL of the event.
 * @throws {Error} If the event already exists or if there is an error inserting the event.
 */
async function insertEventData(eventName, eventDate, eventLocation, eventDescription, eventOrganizer, eventImage) {
  const db = await connect();
  const collection = db.collection('Events');


  const existingEvent = await collection.findOne({
    name: eventName,
    date: eventDate,
    location: eventLocation,
    description: eventDescription,
    organization: eventOrganizer,
  });

  if (existingEvent) {

    throw new Error('Event already exists');
  }

  try {
    const result = await collection.insertOne({
      name: eventName,
      date: eventDate,
      location: eventLocation,
      description: eventDescription,
      organization: eventOrganizer,
      image: eventImage
    });
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Fetches event data by event name from the 'Events' collection in the database.
 * 
 * @async
 * @function fetchEventData
 * @param {string} eventName - The name of the event to fetch.
 * @returns {Object} The event data.
 * @throws {Error} If the event is not found or if there is an error fetching the event.
 */
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

/**
 * Fetches all events from the 'Events' collection in the database.
 * 
 * @async
 * @function fetchEvents
 * @returns {Array<Object>} An array of all event data.
 * @throws {Error} If there is an error fetching the events.
 */
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

/**
 * Fetches filtered events by event name and organizations from the 'Events' collection in the database.
 * 
 * @async
 * @function fetchEventsFiltered
 * @param {string} eventName - The name of the event to filter by.
 * @param {Array<string>} organizations - An array of organization names to filter by.
 * @returns {Array<Object>} An array of filtered event data.
 * @throws {Error} If there is an error fetching the events.
 */
async function fetchEventsFiltered(eventName, organizations){
  const db = await connect();
  const collection = db.collection('Events');

  try {
    console.log("fetchEventsFiltered, organizations ", organizations);
    if (organizations.length == 0){
      console.log("organizations is empty, fetching all orgs");
      const data = await collection.find({ name: { $regex: eventName, $options: "i" }}).toArray();
      return data;
    } else {
      const data = await collection.find({ name: { $regex: eventName, $options: "i" }, organization: { $in: organizations } }).toArray();
      return data;
    }
  } catch (error) {
    throw new Error(error);
  }
}

/**
 * Closes the database connection.
 * 
 * @async
 * @function close
 */
async function close() {
  await client.close();
}

module.exports = {
  connect, insertAccountData, insertEventData, fetchAccountData, fetchEvents, fetchEventData, fetchEventsFiltered, client, close,
};
