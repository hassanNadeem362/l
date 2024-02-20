const express = require("express");
const router = express.Router();
const { regUser,userInfo, regNutritionist, loginUser, loginWithGoogleUser, updateUserInfo, getForgotPassword, getUserInfo, updateProfile } = require('../controllers/authControllers');
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// User registration route
router.post("/signup", regUser);
router.put("/user-update", userInfo);
// Nutritionist registration route
router.post("/regNutritionist",upload.single("document"), regNutritionist);
router.post("/signin", loginUser);
router.post("/loginWithGoogleUser", loginWithGoogleUser);
router.put("/user-update/:userId", updateUserInfo);
router.get("/:userId", getUserInfo);
router.post("/forgotPassword", getForgotPassword);
router.put("/update", updateProfile);

module.exports = router;

