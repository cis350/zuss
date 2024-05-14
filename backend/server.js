/**
 * This module initializes and manages the server.
 * @module server
 */

const app = require('./index');

const port = process.env.PORT || 8000;

/**
 * Starts the server on the specified port.
 * @returns {object} The server
 */
function startServer() {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  return server;
}

/**
 * Closes the given server.
 * @param {object} server - The server to close
 */
function closeServer(server) {
  server.close(() => {
    console.log('HTTP server closed');
  });
}

// If this module is the main module, start the server.
if (require.main === module) {
  startServer();
}

module.exports = { startServer, closeServer };
