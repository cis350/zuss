require('dotenv').config();


const express = require('express');
const database = require('./database');
const app = express();

app.get('/', (_req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
