// // index.js

// const express = require("express");
// const mongoose = require("mongoose");

// const app = express();

// // Use environment variable PORT if available, otherwise default to port 3005
// const port = process.env.PORT || 3005;

// const mongoURI =
//   "mongodb+srv://praveenk:Z4uq2BwMcoJWDZ3k@jokesapp.khokyn1.mongodb.net/?retryWrites=true&w=majority&appName=JokesApp";
// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

// const jokeSchema = new mongoose.Schema({
//   type: String,
//   content: String,
//   status: String,
// });

// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// app.post("/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user && bcrypt.compareSync(password, user.password)) {
//     const token = jwt.sign({ userId: user._id }, "secret");
//     res.json({ token });
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// });

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).send("Unauthorized");
//   }

//   const token = authHeader.substring(7);
//   try {
//     const payload = jwt.verify(token, "secret");
//     req.user = payload;
//     next();
//   } catch (error) {
//     res.status(401).send("Unauthorized");
//   }
// };

// app.get("/jokes", authMiddleware, async (req, res) => {
//   const jokes = await Joke.find();
//   res.json(jokes);
// });
// // Define a route handler for the default home page
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// const seedAdminUser = async () => {
//   const email = "admin@admin.com";
//   const password = "admin123";
//   const hashedPassword = bcrypt.hashSync(password, 8);
//   const user = new User({ email, password: hashedPassword });
//   await user.save();
// };

// const startServer = async () => {
//   await createConnection();
//   await seedAdminUser();
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
// };

// startServer();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Use environment variable PORT if available, otherwise default to port 3005
const port = process.env.PORT || 3005;

const mongoURI =
  "mongodb+srv://praveenk:Z4uq2BwMcoJWDZ3k@jokesapp.khokyn1.mongodb.net/?retryWrites=true&w=majority&appName=JokesApp";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const jokeSchema = new mongoose.Schema({
  type: String,
  content: String,
  status: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Joke = mongoose.model("Joke", jokeSchema);
const User = mongoose.model("User", userSchema);

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, "secret");
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.substring(7);
  try {
    const payload = jwt.verify(token, "secret");
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};

app.get("/jokes", authMiddleware, async (req, res) => {
  const jokes = await Joke.find();
  res.json(jokes);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const seedAdminUser = async () => {
  const email = "admin@admin.com";
  const password = "admin123";
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({ email, password: hashedPassword });
  await user.save();
};

const startServer = async () => {
  await seedAdminUser();
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
};

startServer();
