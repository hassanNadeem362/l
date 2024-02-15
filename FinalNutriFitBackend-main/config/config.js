const jwt = require("jsonwebtoken");
const config = {
  email: process.env.EMAIL_USER,
  pass: process.env.PASS,
};
const tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    process.env.Key,
    { expiresIn: "15m" }
  );
};
module.exports = { config, tokenForVerify };
