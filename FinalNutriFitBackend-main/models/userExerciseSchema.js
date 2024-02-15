// Assuming you have a file named userExerciseSchema.js for your Mongoose model

const mongoose = require('mongoose');

const userExerciseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nutrafit', // Reference to the Nutrafit model or your user model
    required: true
  },
  exerciseName: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserExercise = mongoose.model('UserExercise', userExerciseSchema);

module.exports = UserExercise
        