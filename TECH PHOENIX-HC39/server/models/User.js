const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["student", "mentor"], required: true },

  // Mentor-specific fields (optional for students)
  experience: { type: Number },
  contact: { type: String },
  fees: { type: String },
  company: { type: String },
  domain: { type: String },
});

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare the user's input password with the hashed password in the database
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JWT token containing userId and userType
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, userType: this.userType },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = mongoose.model("User", UserSchema);
