const Nutrafit = require("../models/nutraFit_User");
const Food = require("../models/userFoodSchema");
const UserExercise = require("../models/userExerciseSchema");
const sendResponse = (res, statusCode, code, statusMessage, data = null) => {
    res
      .status(statusCode)
      .json({ status: code, statusMessage: statusMessage, data });
  };
  
  const handleSuccess = (res, status, message, data) => {

    sendResponse(res, status, 200, message, data);
  };
  
  const handleServerError = (res, error) => {
    console.error("Error:", error);
    sendResponse(res, 500, 500, "Internal server error");
  };
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    // Find the user
    const user = await Nutrafit.findById(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Fetch food entries for the user
    const foodEntries = await Food.find({ user: userId });

    // Calculate total calories gained from food
    const totalCaloriesGained = foodEntries.reduce(
      (total, entry) => total + entry.calories,
      0
    );

    // Fetch exercise entries for the user
    const exerciseEntries = await UserExercise.find({ user: userId });

    // Calculate total calories burned from exercise
    const totalCaloriesBurned = exerciseEntries.reduce(
      (total, entry) => total + entry.caloriesBurned,
      0
    );

    // Calculate net calories (gained - burned)
    const netCalories = totalCaloriesGained - totalCaloriesBurned;

    // Prepare response data
    const dashboardData = {
      totalCaloriesGained,
      totalCaloriesBurned,
      netCalories,
      foodEntries,
      exerciseEntries,
    };

    // Send the response
    sendResponse( res,200, 200,"User dashboard retrieved successfully", dashboardData);
  } catch (error) {
    console.error("Error:", error);
    sendResponse(res, 500, "Internal server error");
  }
};

const getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching favorites for user:", userId);

    const user = await Nutrafit.findById(userId);
    if (!user) {
      console.log("User not found");
      return sendResponse(res, 404, "User not found");
    }

    console.log("User found:", user);
    const favoriteFoodEntries = user.favoriteFoods;
    console.log("Favorite food entries:", favoriteFoodEntries);

    sendResponse(res, 200, 200, "User favorites retrieved successfully", favoriteFoodEntries);
  } catch (error) {
    console.error("Error in getUserFavorites:", error);
    handleServerError(res, error);
  }
};

const postUserFavorites = async (req, res) => {
  try {
    const userId = req.body.userId;
    const foodId = req.body.foodId; // Assuming you send the foodId in the request body

    // Find the user by userId
    const user = await Nutrafit.findById(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Check if the foodId is already in the favorites array
    if (user.favoriteFoods.includes(foodId)) {
      return sendResponse(res, 400, "Food is already in favorites");
    }

    // Add the foodId to the favorites array
    user.favoriteFoods.push(foodId);
    
    // Save the user document with the updated favorites
    await user.save();

    sendResponse(res, 200, "Food added to favorites successfully");
  } catch (error) {
    handleServerError(res, error);
  }
};

const removeUserFavorites = async (req, res) => {
  try {
    const userId = req.body.userId;
    const foodId = req.body.foodId; // Assuming you send the foodId in the request body

    // Find the user by userId
    const user = await Nutrafit.findById(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found");
    }

    // Check if the foodId is in the favorites array
    const index = user.favoriteFoods.indexOf(foodId);
    if (index === -1) {
      return sendResponse(res, 400, "Food is not in favorites");
    }

    // Remove the foodId from the favorites array
    user.favoriteFoods.splice(index, 1);

    // Save the user document with the updated favorites
    await user.save();

    sendResponse(res, 200, "Food removed from favorites successfully");
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getUserDashboard,
  getUserFavorites,
  postUserFavorites,
  removeUserFavorites, // Add this line to export the removeUserFavorites function
};
