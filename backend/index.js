// use direct mongoDB not mongoose 
require('dotenv').config();

const express = require('express');
const database = require('./database');
const cookieSession = require('cookie-session');

const app = express();
app.use(express.json()); //access request body as json

// use cors middleware to allow frontend to communicate with backend
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', 
};

app.use(cors(corsOptions));

// utilize cookieSession to keep track of whether user logged in or logged out 
app.use(cookieSession({
  name: 'session',
  keys: ['secretkey1', 'secretkey2'], 
  maxAge: 24 * 60 * 60 * 1000 
}));


//TODO: create post endpoint called '/create-account' that inserts the
//user and password into the db using insertAccountData

// create signup route, take in a request and response 
// need to add next for error handling 
// should be post HTTP because placing in database 
app.post('/sign-up', async (req, res) => {
  const {username, password} = req.body; 
  try {
    // try to insert the data aka process adding in an account with 
    // specified username and password  
    await database.insertAccountData(username, password); 

    // indicate that you successfully registered the user 
    res.status(200).send("Successfully registered user.")
  } catch (error) {
    // if error inserting data, send 500 level error code 
    console.error('Error inserting data:', error);
    res.status(500).send('Failed to insert data.');
  }
});

//TODO: create post endpoint called '/login' that queries the db to 
//verify the user and pass are in the db, returning success if so

app.post('/login', async(req, res) => {
  const {username, password} = req.body; 

  try { 
  let allData = await database.fetchAccountData(); // retrieve all users currently in database
  // retrieve the username and password in the database that matches the request user 
  const user = allData.find(u => u.username === username && u.password === password);

  if (!user) { 
    // if we can't return a matching object, means password is incorrect
    res.status(500).send({message: "Invalid username or password."})
  }

  // if we have a user and their username matches that in session already, 
  // they are already logged in  
  if (req.session.user && req.session.user.username === user.username) {
    return res.status(200).send({message: "User already logged in."});
  }

  // if we successfully retrieve matching user and other status messages
  // haven't run already, that means we can successfully log in 
  // log in by updating user session to store name of logged in user 
  req.session.user = {id: user._id.toString(), username: user.username};
  res.status(200).send({message: "User successfully logged in."});
  
  // catch any errors 
  } catch (error) {
  console.error('Login error:', error);
  res.status(500).send({message: "Login failed."});
  }
})



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


// test sign up adds user
// curl -X POST http://localhost:4000/sign-up \
// -H "Content-Type: application/json" \
// -d '{"username": "testUser", "password": "testPass"}'