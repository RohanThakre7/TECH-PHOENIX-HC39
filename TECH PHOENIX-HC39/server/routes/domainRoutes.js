const express = require("express");
const {
  getAllDomains,
  getDomainDetails,
  addMentorToDomain,
} = require("../controllers/domainController");

const { protect, isMentor } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all domains
router.get("/", getAllDomains);

// Get domain details along with mentors
router.get("/:domainTitle", getDomainDetails);

// Mentor adds themselves to a domain
router.post("/:domainTitle/mentor", protect, isMentor, addMentorToDomain);

module.exports = router;
