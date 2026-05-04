const express = require('express');
const { Register, Login, getProfile, updateProfile } = require("../controllers/userController");
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

router.post("/register", Register);

router.post("/login", Login);
router.get("/userProfile", protect, getProfile);
router.post("/updateProfile", protect, upload.single("image"), updateProfile);

module.exports = router;