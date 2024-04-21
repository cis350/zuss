if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
  } else {
    require('dotenv').config();
  }
  
  const express = require('express');
  const path = require('path');
  const database = require('./database');
  const cors = require('cors');
  
  const app = express();
  //app.use(express.json()); //access request body as json
  
  app.use(express.urlencoded({ extended: true }));
  
  // use cors middleware to allow frontend to communicate with backend
  
  const corsOptions = {
    origin: 'http://localhost:3000', 
  };
  
  //app.use(cors(corsOptions));
  app.use(cors);
  
  
  app.post('/sign-up', async (req, res) => {
    const {name, date, organization} = req.body; 
  
    if (!name || !date || !organization) {
      return res.status(400).json({ message: "Event name, date, and organizer are required." });
    }
  
    try {
      await database.insertEventData(name, date, organization); 
      return res.status(201).json({ token, message: "Successfully registered event." })
    } catch (error) {
      // if error inserting data, send 500 level error code 
      if (error.message === 'Username already exists') {
        return res.status(400).send('Username already exists.');
      }
      console.error('Error inserting data:', error);
      return res.status(500).send('Failed to insert data.');
    }
  });
  
  app.get('/events-data', async (_req, res) => {
    console.log("/events-data");
    try {
      const data = await database.fetchEventData(); 
      console.log("successfully got the data");
      console.log('data:', data);
      return res.status(200).json({ data, message: "Successfully received sample data." });
    } catch (error) {
      console.error('Error receiving sample data:', error);
      res.status(500).send('Failed to receive sample data', error);
    }
  });

  
  //tester endpoint, feel free to delete
  app.get('/accounts-data', async (_req, res) => {
    try {
      const data = await database.fetchAccountData(); 
      res.json(data);
    } catch (error) {
      console.error('Error inserting sample data:', error);
      res.status(500).send('Failed to insert sample data', error);
    }
  });
  
  
  app.use(express.static(path.join(__dirname, '../zuss-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../zuss-app/build/index.html'));
  });
  
module.exports = app;