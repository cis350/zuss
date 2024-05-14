/* eslint-disable no-undef */
// contains test cases for index.js endpoints
// const request = require('supertest'); //make HTTP request without starting the server

const request = require('supertest');
const { startServer, closeServer } = require('./server');
const database = require('./database');

const app = require('./index');

let server;

beforeAll(() => {
  server = startServer();
});

afterAll(async () => {
  closeServer(server);
  database.close();
});

const testUsername = process.env.TEST_USERNAME;
const testPassword = process.env.TEST_PASSWORD;


describe('login', () => {
  afterAll(async () => {
    await database.client.close(); // Close the MongoDB connection
  });
  it('success with existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: testUsername,
        password: testPassword,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('User successfully logged in.');
    expect(response.body.token).toBeDefined();
  });
  it('reject login with invalid username', async () => {
    const randomValue = Math.floor(Math.random() * 10000);
    const response = await request(app)
      .post('/login')
      .send({ username: randomValue, password: randomValue });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Invalid username or password.');
  });
  it('reject login with invalid pass', async () => {
    const randomValue = Math.floor(Math.random() * 10000);
    const response = await request(app)
      .post('/login')
      .send({ username: testUsername, password: randomValue });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual('Invalid username or password.');
  });

  it('should handle missing credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Username and password are required.');
  });
});

describe('sign up', () => {
  afterAll(async () => {
    await database.client.close(); // Close the MongoDB connection
  });
  it('register a new user', async () => {
    const randomValue = Math.floor(Math.random() * 10000);
    const username = `test_user_${randomValue}`;
    const password = `test_pass_${randomValue}`;

    const response = await request(app)
      .post('/sign-up')
      .send({ username, password });

    const responseBody = JSON.parse(response.text);
    expect(response.statusCode).toBe(201);
    expect(responseBody.message).toEqual('Successfully registered user.');
    expect(responseBody.token).toBeDefined();
  });

  it('reject existing username', async () => {
    const randomValue = Math.floor(Math.random() * 10000);

    const response = await request(app)
      .post('/sign-up')
      .send({ username: testUsername, password: randomValue });
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual('Username already exists.');
  });
  it('should handle missing fields', async () => {
    const response = await request(app)
      .post('/sign-up')
      .send({ username: 'onlyuser' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Username and password are required.');
  });
});

describe('GET /events-data', () => {
  it('should fetch events data successfully', async () => {
    const mockEventData = [{ name: 'Event 1', date: '2024-01-01', location: 'Venue 1' }];
    jest.spyOn(database, 'fetchEvents').mockResolvedValue(mockEventData);

    const response = await request(app).get('/events-data');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(mockEventData);
    expect(response.body.message).toEqual('Successfully received sample data.');
  });


});

describe('POST /post-event', () => {
  const validEvent = {
    name: 'New Event',
    date: '2024-02-02',
    location: 'New Venue',
    description: 'A detailed description of the event',
    organizer: 'Organizer Name',
  };

  it('should register a new event successfully', async () => {
    jest.spyOn(database, 'insertEventData').mockResolvedValue({ insertedCount: 1 });

    const response = await request(app)
      .post('/post-event')
      .send(validEvent);

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('Successfully registered event.');
  });

  it('reject the creation of an event when required fields are missing', async () => {
    const incompleteEvent = { ...validEvent, name: undefined };
    const response = await request(app)
      .post('/post-event')
      .send(incompleteEvent);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('Event name, date, and organizer are required.');
  });

  it(' handle database errors when an event already exists', async () => {
    jest.spyOn(database, 'insertEventData').mockRejectedValue(new Error('Event already exists'));

    const response = await request(app)
      .post('/post-event')
      .send(validEvent);

    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual('Event already exists.');
  });
});

// describe('db functions', () => {
   
// afterAll(async () => {
//     await database.client.close(); // Close the MongoDB connection
//   });
//   it('insertAccountData successfully inserts new user', async () => {
//     const username = `test_user_${Math.floor(Math.random() * 10000)}`;
//     const password = 'test_pass';
//     await database.insertAccountData(username, password);
//     console.log('SUCCESSFULLY INSERTED ACCOUNT DATA!');
//     const user = await database.client.db().collection('ProfileInfo').findOne({ username });
//     expect(user).toBeTruthy();
//     expect(user.username).toEqual(username);
//   });

//   it('insertAccountData - fails when username exists', async () => {
//     const username = "lil_emily";
//     const password = "scone";
//     await database.client.db().collection('ProfileInfo').insertOne({ username, password });
//     await expect(database.insertAccountData(username, password)).rejects.toThrow('Username already exists');
//   });

//   it('insertEventData', async () => {
//     const name = `test_name_${Math.floor(Math.random() * 10000)}`;
//     const eventDetails = {
//       name: name,
//       date: "2021-01-01",
//       location: "Unique Location",
//       description: "Unique Description",
//       organizer: "Unique Organizer",
//       image: "url"
//     };
//     await database.insertEventData(eventDetails.name, eventDetails.date, eventDetails.location, eventDetails.description, eventDetails.organizer, eventDetails.image);
//     const event = await database.client.db().collection('Events').findOne({ name: eventDetails.name });
//     expect(event).toBeTruthy();
//   });

//   it('fetchEventsFiltered - retrieves filtered events', async () => {
//     const date_one = `${Math.floor(Math.random() * 10000)}`;
//     const date_two = `${Math.floor(Math.random() * 10000)}`;
//     const events = [
//       { name: "Tech Conference", date: date_one, location: "Tech Park", description: "Tech Event", organization: "Tech Org", image: "url" },
//       { name: "Food Summit", date: date_two, location: "Food Center", description: "Food Event", organization: "Food Org", image: "url" }
//     ];
//     await database.client.db().collection('Events').insertMany(events);
//     const filteredEvents = await database.fetchEventsFiltered("Tech", ["Tech Org"]);
//     expect(filteredEvents[0].name).toContain("Tech Conference");
//   });
// });
