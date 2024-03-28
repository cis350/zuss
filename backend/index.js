require('dotenv').config();


const express = require('express');
const database = require('./database');
const app = express();
app.use(express.json()); //access request body as json

//TODO: create post endpoint called '/create-account' that inserts the
//user and password into the db using insertAccountData

//TODO: create post endpoint called '/login' that queries the db to 
//verify the user and pass are in the db, returning success if so


//tester endpoint, feel free to delete
app.get('/accounts-data', async (_req, res) => {
  try {
    await database.insertAccountData('emily', 'pass'); 
    const data = await database.fetchAccountData(); 
    res.json(data);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    res.status(500).send('Failed to insert sample data.');
  }
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});