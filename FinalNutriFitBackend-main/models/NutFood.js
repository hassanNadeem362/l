const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const nutFoodSchema = new mongoose.Schema({
  nutritionistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nutrafit", 
  },
  foodName: {
    type: String,
   
  },
  description: {
    type: String,
  },
  calories: {
    type: Number,
  },
  carbs: {
    type: Number,
  },
  fats: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  cholesterol: {
    type: Number,
  },
  fiber: {
    type: Number,
  },
  sodium: {
    type: Number,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  comments: [commentSchema], // Array to store comments
});

const NutFood = mongoose.model("NutFood", nutFoodSchema);

module.exports = NutFood;
