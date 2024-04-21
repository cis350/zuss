const { connect } = require('./database');

  /**
   * Inserts a new event document into the Events collection.
   *
   * @param {string} eventName Events's name
   * @param {string} eventDate  Event's date
   * @param {string} eventOrganizer  Event's organizer
   * @returns {Promise}
   * @throws {Error} Throws an error if the event already exists or if the insert fails
   */
  
  async function insertEventData(eventName, eventDate, eventOrganizer) {
      const db = await connect();
      const collection = db.collection('Events');
      const existingName = await collection.findOne({ name: eventName});
      const existingDate = await collection.findOne({ date: eventDate});
      const existingOrganizer = await collection.findOne({ organization: eventOrganizer});
  
    
      if (existingName && existingDate && existingOrganizer) {
        throw new Error('Event already exists');
      }
      // then insert document in profileInfo collection
      try {
        const result = await collection.insertOne({ name: eventName, date: eventDate, organization : eventOrganizer});
        // log number of inserted documents for testing for
        console.log(`${result.insertedCount} documents were inserted`);
      } catch (error) {
        throw new Error(error);
      }
    }
  
  
  async function fetchEventData() {
    const db = await connect();
    const collection = db.collection('Clubs');
    console.log('fetchEventData');
  
    try {
      // console.log("fetchEventData");
      // const data = await collection.find({}).toArray();
      temp_data = [{ clubName: 'WUEC', eventName: 'Hackathon' }];
      console.log('data', temp_data);
      return temp_data;
    } catch (error) {
      console.log('womp womp');
      console.log(error);
      throw new Error(error);
    }
  }
  
  async function close() {
    await client.close();
  }
  
  module.exports = {
    insertEventData, fetchEventData};
  