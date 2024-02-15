const Food = require("../models/userFoodSchema");
const Nutrafit = require("../models/nutraFit_User");

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

const addFood = async (req, res) => {
  try {
    const { userId, foodName, quantity, mealtime ,calories} = req.body;

    if (!foodName || !quantity || !mealtime|| !calories) {
      return sendResponse(res, 400, 400, 'FoodName, quantity, and mealtime are required fields.');
    }

    // Check if the user exists
    const userExists = await Nutrafit.findById(userId);
    if (!userExists) {
      return sendResponse(res, 404, 404, 'User not found.');
    }

    // Create a new food entry with the user ID reference
    const newFoodEntry = new Food({
      user: userId,
      foodName: foodName,
      quantity: quantity,
      mealtime: mealtime,
      calories:calories
    });

    await newFoodEntry.save();
    handleSuccess(res, 200, 'Food added successfully!');
  } catch (error) {
    handleServerError(res, error);
  }
};

const getUserFoodHistory = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming you get the userId from the request parameters

    // Check if the user exists
    const userExists = await Nutrafit.findById(userId);
    if (!userExists) {
      return sendResponse(res, 404, 404, 'User not found.');
    }

    // Get the user's food history sorted by timestamp in descending order
    const userFoodHistory = await Food.find({ user: userId }).sort({ createdAt: -1 });

    handleSuccess(res, 200, 'User food history retrieved successfully!', userFoodHistory);
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  addFood,
  getUserFoodHistory
};
