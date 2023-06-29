const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

// Initialize express app
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Set up Sequelize with the right credentials and connection details.
const sequelize = new Sequelize("doronrds", "admin", "12345678", {
  host: "database-2.cqnxo3jyijph.eu-north-1.rds.amazonaws.com",
  dialect: "mysql",
});

// Define a User model
const User = sequelize.define("User", {
  username: DataTypes.STRING,
  password: DataTypes.STRING, // Note: For a real application, it's recommended to hash the password before storing it.
  email: DataTypes.STRING,
});

// Create the users table if it doesn't exist yet
User.sync().then(() => console.log("User table created1"));

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log("Databas e connected..."))
  .catch((err) => console.log("Error: " + err));

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ username }, { email }],
      },
    });
    if (existingUser) {
      // If user already exists, send a message to the client
      res.json({ success: false, message: "Username/Email already exists." });
    } else {
      // If user does not exist, create a new user
      const user = await User.create({ username, password, email });
      console.log("Registered user:", user.toJSON());

      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { username, password } });

    if (user) {
      console.log("Logged in user:", user.toJSON());
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.json({ success: false });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
