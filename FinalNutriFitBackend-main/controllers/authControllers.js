const nodemailer = require("nodemailer");
const { sendEmail } = require("../lib/email sender/sender");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Nutrafit = require("../models/nutraFit_User");



const signInToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
    process.env.Key,
    {
      expiresIn: "2d",
    }
  );
};

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

// const regUser = async (req, res) => {
//   const { name, email, phone, password, role } = req.body;
//   const document = req.file;
//
//   console.log("🚀 ~ regUser ~  req.body:", req.body);
//
//   // Ensure that the file is successfully uploaded
//   if (!document) {
//     return sendResponse(res, 400, 422, "Document upload failed");
//   }
//
// // Process the document data
//   const documentData = {
//     data: document.buffer,
//     contentType: document.mimetype,
//   };
//
//   if (!name || !email || !password || !phone) {
//     return sendResponse(res, 200, 422, "Fill all details");
//   }
//
//   try {
//     const preemail = await Nutrafit.findOne({ email: email });
//     const prePhone = await Nutrafit.findOne({ phone: phone });
//
//     if (preemail) {
//       return sendResponse(res, 200, 422, "This email already exists");
//     } else if (prePhone) {
//       return sendResponse(
//           res,
//           200,
//           422,
//           "This phone number already exists. Please use a different phone number."
//       );
//     } else {
//       const hashedPassword = bcrypt.hashSync(password);
//
//       const finaluser = new Nutrafit({
//         name,
//         email,
//         phone,
//         password: password,
//         role: role,
//         document: {
//           data: document.buffer,
//           contentType: document.mimetype,
//         },
//
//       });
//
//
//
//       await finaluser.save();
//       const userId = finaluser._id;
//       const token = signInToken(finaluser);
//
//       const regCustomer = {
//         _id: userId,
//         name,
//         email,
//         phone,
//         password: password,
//         document: documentData,
//         role: "customer",
//         token,
//       };
//
//       handleSuccess(res, 200, "Signup success", regCustomer);
//     }
//   } catch (err) {
//     handleServerError(res, err);
//   }
// };


// ... (previous code)

const regUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !password || !phone) {
    return sendResponse(res, 200, 422, "Fill all details");
  }

  try {
    const preemail = await Nutrafit.findOne({ email: email });
    const prePhone = await Nutrafit.findOne({ phone: phone });

    if (preemail) {
      return sendResponse(res, 200, 422, "This email already exists");
    } else if (prePhone) {
      return sendResponse(
        res,
        200,
        422,
        "This phone number already exists. Please use a different phone number."
      );
    } else {
      const hashedPassword = bcrypt.hashSync(password);

      const finaluser = new Nutrafit({
        name,
        email,
        phone,
        password: hashedPassword,
        role: role,
      });

      await finaluser.save();
      const userId = finaluser._id;
      const token = signInToken(finaluser);

      const regCustomer = {
        _id: userId,
        name,
        email,
        phone,
        password: hashedPassword,
        role: "customer",
        token,
      };

      handleSuccess(res, 200, "Signup success", regCustomer);
    }
  } catch (err) {
    handleServerError(res, err);
  }
};

const regNutritionist = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  const document = req.file;

  if (!name || !email || !password || !phone || !document) {
    return sendResponse(res, 200, 422, "Fill all details including document");
  }

  try {
    const preemail = await Nutrafit.findOne({ email: email });
    const prePhone = await Nutrafit.findOne({ phone: phone });

    if (preemail) {
      return sendResponse(res, 200, 422, "This email already exists");
    } else if (prePhone) {
      return sendResponse(
        res,
        200,
        422,
        "This phone number already exists. Please use a different phone number."
      );
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const finalNutritionist = new Nutrafit({
        name,
        email,
        phone,
        password: hashedPassword,
        role: role,
        document: {
          data: document.buffer,
          contentType: document.mimetype,
        },
      });

      await finalNutritionist.save();
      const nutritionistId = finalNutritionist._id;
      const token = signInToken(finalNutritionist);

      const regNutritionist = {
        _id: nutritionistId,
        name,
        email,
        phone,
        password: hashedPassword,
        document: {
          data: document.buffer,
          contentType: document.mimetype,
        },
        role: "nutritionist",
        token,
      };

      handleSuccess(res, 200, "Signup success", regNutritionist);
    }
  } catch (err) {
    handleServerError(res, err);
  }
};

// ... (rest of the code)





const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const valEmail = await Nutrafit.findOne({ email: email });

    if (!valEmail) {
      sendResponse(res, 200, 422, "User not found");
      return;
    }

    let token; // Define the token variable here

    if (valEmail.email === "admin@gmail.com" && valEmail.password === "admin123") {
      token = signInToken(valEmail); // Assign token value if admin user
    } else {
      const comparePassword = await bcrypt.compare(password, valEmail.password)
      if (comparePassword) {
        token = signInToken(valEmail); // Assign token value if regular user
      } else {
        sendResponse(res, 200, 422, "Password invalid");
        return; // Return early after sending response
      }
    }

    // Use token variable here
    handleSuccess(res, 200, "Login successful", {
      token,
      _id: valEmail._id,
      name: valEmail.name,
      email: valEmail.email,
      phone: valEmail.phone,
      role: valEmail.role,
    });

  } catch (err) {
    console.log("Error:", err);
    handleServerError(res, err);
  }
};



const loginWithGoogleUser = async (req, res) => {
  try {
    const { email } = req.body;
    const valEmail = await Nutrafit.findOne({ email: email });

    if (valEmail) {
      const token = signInToken(valEmail);

      handleSuccess(res, 200, "Login successful", {
        token,
        _id: valEmail._id,
        firstName: valEmail.firstName,
        lastName: valEmail.lastName,
        email: valEmail.email,
        phone: valEmail.phone,
        country: valEmail.country,
        state: valEmail.state,
        role: valEmail.role,
      });
    } else {
      sendResponse(res, 200, 422, "User not found");
    }
  } catch (err) {
    console.log("Error:", err);
    handleServerError(res, err);
  }
};


//user info
const userInfo = async (req, res) => {
  const userId = req.body.id; // Assuming you have middleware to extract user information from the request

  try {
    const user = await Nutrafit.findById(userId);

    if (!user) {
      return sendResponse(res, 404, 404, "User not found");
    }

    // Extract additional information from the request body
    const {
      fullName,
      healthGoal,
      gender,
      dateOfBirth,
      inches,
      heightFeet,
      currentWeight,
      desiredWeight,
      stamina,
      isExercise,
      dietaryPreferences,
      foodAllergies,
      proteinConsumption,
      fatsConsumption,
      dailyMealChoices,
      dailyActivityLevel,
      sleepTime,
      wakeUpTime,
      employmentStatus,
      timeLeastActivity,
      desiredBody,
      currentBody,
      ebwo,
      physicalScheduleActivity,
      exercisePref
    } = req.body;

    // Update user's information based on the fields present in the request body
    if (fullName) user.fullName = fullName;
    if (healthGoal) user.healthGoal = healthGoal;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (inches && heightFeet) user.height = `${heightFeet}.${inches} ft`;
    if (currentWeight ) user.currentWeight = `${currentWeight} kg`;
    if (desiredWeight ) user.desiredWeight = `${desiredWeight} kg`;
    if (currentBody) user.currentBody = currentBody;
    if (desiredBody) user.desiredBody = desiredBody;
    if (ebwo) user.ebwo = ebwo;
    if (exercisePref) user.exercisePref = exercisePref;
    if (stamina) user.stamina = stamina;
    if (isExercise) user.isExercise = isExercise;
    if (dietaryPreferences) user.dietaryPreferences = dietaryPreferences;
    if (foodAllergies) user.foodAllergies = foodAllergies;
    if (proteinConsumption) user.proteinConsumption = proteinConsumption;
    if (fatsConsumption) user.fatsConsumption = fatsConsumption;
    if (dailyMealChoices) user.dailyMealChoices = dailyMealChoices;
    if (dailyActivityLevel) user.dailyActivityLevel = dailyActivityLevel;
    if (wakeUpTime && wakeUpTime){
     user.wakeUpTime = wakeUpTime;
     user.sleepTime = sleepTime;
    } 
    if (employmentStatus) user.employmentStatus = employmentStatus;
    if (timeLeastActivity) user.timeLeastActivity = timeLeastActivity;
    if (physicalScheduleActivity) user.physicalScheduleActivity = physicalScheduleActivity;

    await user.save();

    handleSuccess(res, 200, "User information updated successfully", user);
  } catch (err) {
    handleServerError(res, err);
  }
};







const updateUserInfo = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateFields = req.body;

    const user = await Nutrafit.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error updating user information:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getNutrafits = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error)
  }
}

const getUserInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Nutrafit.findById(userId);

    if (!user) {
      return sendResponse(res, 404, 404, "User not found");
    }
    handleSuccess(res, 200, "User information retrieved successfully", user);
  } catch (err) {
    handleServerError(res, err);
  }
};
const updateProfile = async (req, res) => {
  const userId = req.body.id; // Assuming you have middleware to extract user information from the request

  try {
    const user = await Nutrafit.findById(userId);

    if (!user) {
      return sendResponse(res, 404, 404, "User not found");
    }

    // Extract fields from the request body
    const { name, email, password, phone } = req.body;

    // Update user's information based on the fields present in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      // const hashedPassword = bcrypt.hashSync(password);
      user.password = password;
    }
    // if (!bcrypt.compareSync(fieldsToUpdate.password, user.password)) {
    //   // If the incoming password is not hashed, hash it
    //   const hashedPassword = bcrypt.hashSync(fieldsToUpdate.password, 10); // Use an appropriate salt value
    //   fieldsToUpdate.password = hashedPassword;
    // }
    if (phone) user.phone = phone;

    await user.save();

    // You can generate a new token if needed
    const token = signInToken(user);

    handleSuccess(res, 200, "Profile updated successfully", {
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
  } catch (err) {
    handleServerError(res, err);
  }
};



// const getForgotPassword = async (req, res) => {
//   const userEmail = req.body.email; // Assuming you have the email in the request body

//   try {
//     const user = await Nutrafit.findOne({ email: userEmail });

// if (user) {
//   const body = {
//     from: process.env.EMAIL_USER,

//     to: `${userEmail}`,
//     subject: "Forget Password",
//     html: `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">

// </head>
// <body>
// <div class="container">

// <div class="info">
//     <p>Hello <strong>${user.name},</strong></p>
//     <p>Your password is </p>  <p>${user.password}</p>

// </div>

// <hr>
// <div class="">
//     <p>From</p>
//     <p style="font-weight: bold;">Nutrifit Team</p>
// </div>
// </div>
// </body>
// </html>

//     `

//   };

//   const message = "Please check your email to Recover password!";
//   sendEmail(body, res, message);

//   handleSuccess(res, 200, "Please check email");
// }
//   } catch (err) {
//     handleServerError(res, err);
//   }

// };
const getForgotPassword = async (req, res) => {
  const userEmail = req.body.email; // Assuming you have the email in the request body

  try {
    const user = await Nutrafit.findOne({ email: userEmail });

    if (user) {
      const body = {
        from: process.env.EMAIL_USER,
        to: `${userEmail}`,
        subject: "Forget Password",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body>
            <div class="container">
              <div class="info">
                <p>Hello <strong>${user.name},</strong></p>
                <p>Your password is </p>  <p>${user.password}</p>
              </div>
              <hr>
              <div class="">
                <p>From</p>
                <p style="font-weight: bold;">Nutrifit Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      const message = "Please check your email to Recover password!";
      sendEmail(body, res, message);
    } else {
      res.status(404).send({
        message: "User not found",
      });
    }
  } catch (err) {
    handleServerError(res, err);
  }
};

module.exports = {
  getForgotPassword,
  regUser,
  loginUser,
  loginWithGoogleUser,
  userInfo,
  getUserInfo,
  updateUserInfo,
  updateProfile,
  regNutritionist,
};




