/* eslint-disable no-undef */
// contains test cases for index.js endpoints
const request = require('supertest'); //make HTTP request without starting the server
const app = require('./index.js');

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
    expect(response.body).toEqual({ message: "User successfully logged in." });
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

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual('Successfully registered user.');
  });
});