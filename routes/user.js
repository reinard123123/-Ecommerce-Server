const express = require("express");
const userController = require("../controllers/user.js");
const auth = require("../auth.js");
const { verify, verifyAdmin } = require('../auth.js');

const router = express.Router();

// Routes for handling user details

// Check if an email already exists
router.post("/check-email", userController.checkEmail);

// User registration
router.post("/register", userController.registerUser);

// User login
router.post("/login", userController.loginUser);

// Get user profile
router.get("/details", verify, userController.getProfile);

// Change a user to admin (Admin Only)
router.put("/updateAdmin/:userId", verify, verifyAdmin, userController.updateUserAsAdmin);

// Password reset
router.put("/reset-password", verify, userController.resetPassword);

// Need debugging:
// Update user profile
router.put("/updateProfile", verify, userController.updateProfile);

// Update user data route
router.put("/update", verify, userController.updateUserData)

module.exports = router;
