/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const database = require('./database');

const app = express();
app.use(express.json()); // access request body as json

app.use(express.urlencoded({ extended: true }));

// use cors middleware to allow frontend to communicate with backend

const corsOptions = {
  origin: 'http://localhost:3000',
};

// app.use(cors(corsOptions));
app.use(cors());

// root endpoint route
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    await database.insertAccountData(username, password);
    const payload = { username };
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.status(201).json({ token, message: 'Successfully registered user.' });
  } catch (error) {
    // if error inserting data, send 500 level error code
    if (error.message === 'Username already exists') {
      return res.status(400).send('Username already exists.');
    }
    console.error('Error inserting data:', error);
    return res.status(500).send('Failed to insert data.');
  }
});

app.post('/login', async (req, res) => {
  console.log('Login request received with:', req.body);
  if (!req.body.username || !req.body.password) {
    console.log('Missing credentials');
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    console.log('Fetching account data...');
    const allData = await database.fetchAccountData();
    console.log('Account data retrieved:', allData);
    const user = allData.find((u) => u.username === req.body.username && u.password
    === req.body.password);

    if (!user) {
      console.log('No user found with the provided credentials');
      return res.status(401).send({ message: 'Invalid username or password.' });
    }

    console.log('User found:', user);
    const payload = { username: user.username };
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    console.log('JWT token generated');

    return res.status(200).send({ token, message: 'User successfully logged in.' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).send({ message: 'Login failed.' });
  }
});

app.get('/events-data', async (_req, res) => {
  console.log('/events-data');
  try {
    const data = await database.fetchEvents();
    console.log('successfully got the data');
    console.log('data:', data);
    return res.status(200).json({ data, message: 'Successfully received sample data.' });
  } catch (error) {
    console.error('Error receiving sample data:', error);
    return res.status(500).json({ message: error });
  }
});

app.post('/post-event', async (req, res) => {
  const { name, date, location, blurb, descriptionLong, organizer } = req.body;

  if (!name || !date || !organizer || !blurb || !location || !descriptionLong) {
    return res.status(400).json({ message: 'Event name, date, and organizer are required.' });
  }

  try {
    await database.insertEventData(name, date, location, blurb, descriptionLong, organizer);
    return res.status(201).json({ message: 'Successfully registered event.' });
  } catch (error) {
    // if error inserting data, send 500 level error code
    if (error.message === 'Event already exists') {
      return res.status(400).send('Event already exists.');
    }
    console.error('Error inserting data:', error);
    return res.status(500).send('Failed to insert data.');
  }
});

// tester endpoint, feel free to delete
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
