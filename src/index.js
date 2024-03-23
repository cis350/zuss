const express = require('express');
const database = require('./database');
const app = express();

app.get('/', (_req, res) => {
  res.send('hello');
});

app.get('/insert-sample-data', async (_req, res) => {
  try {
    await database.insertSampleData(); 
    const data = await database.fetchClubsData(); // Fetch the sample data
    res.json(data);
  } catch (error) {
    console.error('Error inserting sample data:', error);
    res.status(500).send('Failed to insert sample data.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

