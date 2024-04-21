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

    
    /**
     * Fetch all events from Events collection
     *
     * @returns {Promise}
     * @throws {Error} Throws an error if retrieval fails
     */
    async function fetchEvents() {
        const db = await connect();
        const collection = db.collection('Events');
    
        try {
            const data = await collection.find({}).toArray(); 
            return data; 
        }  catch (error) {
            throw new Error(error);
        }
    }
  
  
 /**
 * Fetches a single event by its name.
 *
 * @param {string} eventName Name of the event to retrieve
 * @returns {Promise}
 * @throws {Error} Throws an error if retrieval fails or event does not exist
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
  
  
  module.exports = { insertEventData, fetchEvents, fetchEventData };
  