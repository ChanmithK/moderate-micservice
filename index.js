// index.js

const express = require("express");
const app = express();

// Use environment variable PORT if available, otherwise default to port 3005
const port = process.env.PORT || 3005;

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
