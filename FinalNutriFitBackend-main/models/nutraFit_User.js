const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret_key = process.env.Key;
const key = secret_key;

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "customer", // Default role is customer
    enum: ["admin", "customer", "nutritionist"], // Allowed roles
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[0-9\+\-\s]+$/.test(value);
      },
      message: "Invalid phone number",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },

  document: {
    type: {
      data: Buffer,
      contentType: String,
    },
  },

  // New fields added to the schema
  fullName: String,
  healthGoal: String,
  gender: {
    type: String,
    default: "male",
    enum: ["male", "female", "others"],
  },
  dateOfBirth: {
    type: Date,
  },
  height: String,
  currentWeight: String,
  desiredWeight: String,
  currentBody: String,
  desiredBody: String,
  ebwo: String,
  stamina: String,
  isExercise: {
    type: Boolean,
    default: false,
  },
  exercisePref: {
    type: String,
    enum: ["aerobic", "muscle", "bone"],
  },
  dietaryPreferences: {
    type: String,
    enum: ["noRestriction", "pescatarian", "vegetarian", "paleo", "keto", "vegan"],
  },
  foodAllergies: {
    type: [String],
  },
  proteinConsumption: {
    type: [String],
  },
  fatsConsumption: {
    type: [String],
  },
  dailyMealChoices: {
    type: String,
    enum: ["2Meals", "3Meals", "SmallerFrequentMeals"],
  },
  dailyActivityLevel: {
    type: String,
    enum: ["Sedentary", "Light Active", "Moderately Active", "Very Active", "Extremely Active"],
  },
  sleepTime: String,
  wakeUpTime: String,
  employmentStatus: {
    type: String,
    enum: ["Office Job", "Self Employed"],
  },
  timeLeastActivity: String,
  physicalScheduleActivity: String,
  favoriteFoods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NutFood', // Assuming 'Food' is the model for your food items
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token2 = jwt.sign({ _id: this._id }, key, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: token2 });
    await this.save();
    return token2;
  } catch (error) {
    console.error(error);
  }
};

const Nutrafit = mongoose.model("Nutrafit", userSchema);

module.exports = Nutrafit;
