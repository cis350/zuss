const express = require('express');
const database = require('./database');

// Import the Express webapp configuration
const app = require('./index');

const port = process.env.PORT || 8000;

// Listen on the configured port
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
    console.log('Closing database connection...');
    await database.close();
    server.close(() => {
      console.log('HTTP server closed');
  });
});
  
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing MongoDB connection');
    await database.close();
    server.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = app;

