const app = require('./index');

const port = process.env.PORT || 8000;

function startServer() {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  return server;
}

function closeServer(server) {
  server.close(() => {
    console.log('HTTP server closed');
  });
}
if (require.main === module) {
  startServer();
}

module.exports = { startServer, closeServer };
