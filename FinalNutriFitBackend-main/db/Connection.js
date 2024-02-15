const mongoose = require("mongoose");
const Connection = async (username, password) => {
const cors = require('cors');
  const URL ="mongodb+srv://NutriFit:nutrifit1234@cluster0.a8suvad.mongodb.net";
  try {
    await mongoose.connect(URL, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("🚀 ~ file db.js:7 ~ connection Database connected");
  } catch (error) {
    console.log("🚀 ~ file: db.js:7 ~ connection ~ error:", error);
  }
};
module.exports=Connection