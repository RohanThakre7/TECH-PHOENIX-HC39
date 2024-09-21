const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
  name: String,
  photo: String,
  experience: String,
  contact: String,
  email: String,
  fees: String,
});

const DomainSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  mentors: [MentorSchema], // Embed mentor details within domain
});

module.exports = mongoose.model("Domain", DomainSchema);
