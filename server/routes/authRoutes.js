const express = require("express");
const router = express.Router();
const User = require("../models/User");



router.post("/signup", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({ email, password });

    await user.save();

    res.json({ message: "Signup successful", userId: user._id });

  } catch (err) {
    res.status(500).send("Server error");
  }
});



router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.json({
    message: "Login successful",
    userId: user._id
  });
});

module.exports = router;