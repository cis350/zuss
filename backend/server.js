const app = require('./index');
const database = require('./database');

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await database.client.close().finally(() => {
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0); // Ensure the process exits
    });
  });
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing MongoDB connection');
  await database.client.close().finally(() => {
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0); // Ensure the process exits
    });
  });
});
