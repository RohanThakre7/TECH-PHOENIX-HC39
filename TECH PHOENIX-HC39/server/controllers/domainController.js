const Domain = require("../models/Domain");
const User = require("../models/User");

// Get all domains
exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find({}, "title details");
    res.status(200).json(domains);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get domain details along with mentors
exports.getDomainDetails = async (req, res) => {
  const { domainTitle } = req.params;
  console.log(domainTitle);

  try {
    const domain = await Domain.findOne({ title: domainTitle });
    console.log(domain);

    if (!domain) {
      return res.status(404).json({ msg: "Domain not found" });
    }

    res.status(200).json(domain);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Add mentor to a domain
exports.addMentorToDomain = async (req, res) => {
  const { domainTitle } = req.params;
  const userId = req.user._id; // Correctly access user ID from the token

  try {
    // Fetch the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Fetch the domain
    const domain = await Domain.findOne({ title: domainTitle });
    if (!domain) {
      return res.status(404).json({ msg: "Domain not found." });
    }

    // Check if mentor is already added to this domain
    const mentorExists = domain.mentors.some(
      (mentor) => mentor.email === user.email
    );
    if (mentorExists) {
      return res
        .status(400)
        .json({ msg: "Mentor already added to this domain." });
    }

    // Create mentor data
    const mentorData = {
      name: user.fullName,
      photo:
        user.photo ||
        "https://imgs.search.brave.com/m3AjEyYqrqs66D2V3HzEOVsAP9yRCKGsKsLCf-_NFgo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzYyLzYzLzY1/LzM2MF9GXzQ2MjYz/NjUwMl85Y0RBWXV5/VnZCWTRxWUpsSGpX/N3ZxYXI1SFlTOGg4/eC5qcGc",
      experience: `${user.experience} years`,
      contact: user.contact,
      email: user.email,
      fees: user.fees,
      company: user.company,
    };

    // Add mentor to the domain
    domain.mentors.push(mentorData);
    await domain.save();

    res.status(200).json({ msg: "Mentor added to domain successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error." });
  }
};
