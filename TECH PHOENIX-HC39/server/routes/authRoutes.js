const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validateUser");
const { signupSchema, loginSchema } = require("../validators/userValidator");
const { protect } = require("../middleware/authMiddleware"); // Protect middleware to verify token

const router = express.Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", protect, authController.getCurrentUser); // New route to get current user info

module.exports = router;
