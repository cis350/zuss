if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' });
} else {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const database = require('./database');
const eventsDataBase = require('./events');
const jwt = require('jsonwebtoken');
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


// root endpoint route
app.get('/', (_req, resp) => {
  resp.json({ message: 'hello, deployment is active' });
});


app.post('/sign-up', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    await database.insertAccountData(username, password);
    const payload = { username };
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return res.status(201).json({ token, message: "Successfully registered user." })
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  try {
    let allData = await database.fetchAccountData();
    console.log("alldata:", allData); // retrieve all users currently in database
    // retrieve the username and password in the database that matches the request user 
    const user = allData.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).send({ message: "Invalid username or password." })
    }

    const payload = { username: user.username };
    const secretKey = process.env.JWT_SECRET_KEY || 'secret';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return res.status(200).send({ token, message: "User successfully logged in." });

  } catch (error) {
    console.error('Login error:', error);
    if (!res.headersSent) {
      return res.status(500).send({ message: "Login failed." });
    }
  }
})


app.post('/add-event', async (req, res) => {
  const { name, date, location, description, organization } = req.body;

  if (!name || !date || !organization || !location || !description) {
    return res.status(400).json({ message: 'Event name, date, and organizer are required.' });
  }

  try {
    await eventsDataBase.insertEventData(name, date, location, description, organization);
    return res.status(201).json({ message: 'Successfully registered event.' });
  } catch (error) {
    // if error inserting data, send 500 level error code 
    console.error('Error inserting data:', error);
    return res.status(500).send('Failed to insert data.');
  }
});

app.get('/event', async (_req, res) => {
  try {
    const data = await eventsDataBase.fetchEventData();
    console.log('successfully got the data');
    console.log('data:', data);
    return res.status(200).json({ data, message: 'Successfully received sample data.' });
  } catch (error) {
    console.error('Error receiving sample data:', error);
    res.status(500).send('Failed to receive sample data', error);
  }
});

app.get('/events', async (_req, res) => {
  try {
    const data = await eventsDataBase.fetchEvents();
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
