/* eslint-disable no-undef */
// contains test cases for index.js endpoints
//const request = require('supertest'); //make HTTP request without starting the server
const app = require('./index.js');
const request = require('supertest');
const database = require('./database');




/**
 * Test the login endpoint
 */
describe('login', () => {
  afterAll(async () => {
    await database.client.close(); // Close the MongoDB connection
  });
  it('success with existing user', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'lil_emily',
        password: 'scone'
      });
    
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("User successfully logged in.");
      expect(response.body.token).toBeDefined();      
  });
  it('reject login with invalid username', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'blah', password: 'lol' });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Invalid username or password.");
  });
  it('reject login with invalid pass', async () => {

    const response = await request(app)
      .post('/login')
      .send({ username: 'emily', password: 'haha' });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toEqual("Invalid username or password.");
  });


  
});


/**
 * Test the registration
 */
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
      expect(response.statusCode).toBe(200);
      expect(responseBody.message).toEqual("Successfully registered user.");
      expect(responseBody.token).toBeDefined();
      
  });

  it('reject existing username', async () => {
  

    const response = await request(app)
      .post('/sign-up')
      .send({ username: 'lil_emily', password: 'lol' });
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual("Username already exists.");
  });
});