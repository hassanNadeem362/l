const Nutrafit = require("../models/nutraFit_User");
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
const addExercise = async (req, res) => {
  try {
    const { userId, exerciseName, duration, caloriesBurned } = req.body;

    if (!userId||!exerciseName || !duration || !caloriesBurned) {
      return sendResponse(res, 400, 400, 'ExerciseName, duration,userId, and caloriesBurned are required fields.');
    }

    // Assuming Nutrafit is your user model, replace it with your actual user model
    const userExists = await Nutrafit.findById(userId);
    if (!userExists) {
      return sendResponse(res, 404, 404, 'User not found.');
    }

    const newExerciseEntry = new UserExercise({
      user: userId,
      exerciseName: exerciseName,
      duration: duration,
      caloriesBurned: caloriesBurned,
    });

    await newExerciseEntry.save();
    handleSuccess(res, 200, 'Exercise added successfully!');
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  addExercise,
};
      