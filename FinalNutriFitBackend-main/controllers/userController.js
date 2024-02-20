const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require("bcrypt");

const registerController = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password || !pic) {
      return res.status(400).send("Field is missing.");
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      pic,
    });

    if (newUser) {
      res.status(201).json({
        name,
        email,
        password,
        pic,
        token: generateToken(newUser._id),
      });
    } else {
      return res.status(400).send("Fail to Create the User.");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).send("Password not match");
    }
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchUser = async (req, res) => {
  try {
    const  id = req.params.id;
    const users = await User.findById({_id: id});
    res.status(201).json({
      users
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchUserAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      users
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerController,
  loginController,
  fetchUserAll,
  fetchUser
};
