// contains test cases for index.js endpoints

const backend = require('./index.js');


/**
 * Test the login endpoint
 */
test('Test the login endpoint', async () => {
  const req = {
    body: {
      username: 'lil_aashy',
      password: 'macaroon'
    }
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn()
  };

  await backend.login(req, res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.send).toHaveBeenCalledTimes(1);
  expect(res.send).toHaveBeenCalledWith({message: "User successfully logged in."});
});


/**
 * Test the registration
 */
test('Test the registration endpoint', async () => {
  const req = {
    body: {
      username: 'lil_emily',
      password: 'scone'
    }
  };

  let sentMessage = '';
  const res = {
    status: jest.fn(() => res),
    send: jest.fn((message) => {
      sentMessage = message;
    })
  };

  await backend.signUp(req, res);

  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(sentMessage).toEqual('Successfully registered user.');
  
});