// const mongoose = require("mongoose");

// const nutFoodSchema = new mongoose.Schema({
//   nutritionistId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Nutrafit', // Reference to the Nutrafit model
//     required: true,
//   },
//   foodName: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   calories: {
//     type: Number,
//     required: true,
//   },
//   carbs: {
//     type: Number,
//     required: true,
//   },
//   fats: {
//     type: Number,
//     required: true,
//   },
//   protein: {
//     type: Number,
//     required: true,
//   },
//   cholesterol: {
//     type: Number,
//     required: true,
//   },
//   fiber: {
//     type: Number,
//     required: true,
//   },
//   sodium: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// const NutFood = mongoose.model("NutFood", nutFoodSchema);

// module.exports = NutFood;



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
    ref: "Nutrafit", // Reference to the Nutrafit model
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  cholesterol: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  comments: [commentSchema], // Array to store comments
});

const NutFood = mongoose.model("NutFood", nutFoodSchema);

module.exports = NutFood;
