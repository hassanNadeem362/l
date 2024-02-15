const express = require("express");
const router = express.Router();

const {
  getNutritionistDashboard,
  deleteNutritionist,
  getNutDashboard,addFood,addedFoods,deleteFood,addedFoodById, updateFood
} = require("../controllers/nutritionistDashboard");
const multer = require("multer");

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/dashboard", getNutritionistDashboard);
router.get("/:userId/nutritionDash", getNutDashboard);
router.get("/addedFoods", addedFoods);
router.get("/addedFoods/:nutId", addedFoodById);
// router.post("/:userId/nutritionDash", addFood);
router.post("/addFood", upload.single("image"), addFood);
router.post("/deleteFood/:foodId", deleteFood); // New endpoint for user favorites
router.put("/updateFood/:foodId", updateFood);

router.delete("/del/:id", deleteNutritionist);

module.exports = router;
