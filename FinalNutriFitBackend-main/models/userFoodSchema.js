const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nutrafit',
    // required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  mealtime: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
