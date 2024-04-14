/**
 * This module will start the express server
 */

// import the express app
const app = require('./server');

const port = 8080;
// start the web server
app.listen(port, () =>{
    console.log('Server running on port', port);
})