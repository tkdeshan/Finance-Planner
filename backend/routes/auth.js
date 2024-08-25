const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-user-details", verifyToken, getUserDetails); // New route to get user details

module.exports = router;
