// userDashboard.js

const express = require("express");
const router = express.Router();

const { getUserDashboard, getUserFavorites,postUserFavorites,removeUserFavorites } = require('../controllers/userDashboard');

router.get("/:userId/dashboard", getUserDashboard);
router.get("/favorites/:userId", getUserFavorites); // New endpoint for user favorites
router.post("/addToFavorites", postUserFavorites); // New endpoint for user favorites
router.post("/removeUserFavorites", removeUserFavorites); // New endpoint for user favorites

module.exports = router;
