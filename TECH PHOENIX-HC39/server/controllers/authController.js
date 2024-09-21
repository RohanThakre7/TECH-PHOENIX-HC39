const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    userType,
    experience,
    contact,
    fees,
    company,
  } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ msg: "User already exists with given email." });
    }

    user = new User({
      fullName,
      email,
      password,
      userType,
      ...(userType === "mentor" && {
        experience,
        contact,
        fees,
        company,
      }),
    });

    await user.save();

    const token = await user.generateToken();

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    console.log(password);
    console.log(user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = await user.generateToken();

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
};

// Controller to get the current logged-in user
exports.getCurrentUser = async (req, res) => {
  try {
    // Access the user from req.user
    const user = req.user; // Use req.user directly

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user); // Send the user data as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
