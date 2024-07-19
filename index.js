// index.js

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Use environment variable PORT if available, otherwise default to port 3005
const port = process.env.PORT || 3005;

const mongoURI =
  "mongodb+srv://praveenk:Z4uq2BwMcoJWDZ3k@jokesapp.khokyn1.mongodb.net/?retryWrites=true&w=majority&appName=JokesApp";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
