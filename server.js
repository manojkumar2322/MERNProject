const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const { User } = require("./models/User");
const cors = require("cors");
const path = require('path');
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

app.post("/signup", async (req, res) => {  // Fixed syntax here
  try {
    const { name, email, where ,pass} = req.body;
    console.log(req.body);
    
    const user = await User.findOne({ email });
    if (user) {
      console.log("User already exists!");
      return res.json({ data: "User Already Exists!!!" });
    }
    
    const newUser = new User({
      name,
      email,
      pass,
      where,
    });
    
    await newUser.save();
    res.json({ data: "Success!!!" });
  } catch (error) {
    console.log("Signup error:", error);
    res.json({ data: error.message });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
