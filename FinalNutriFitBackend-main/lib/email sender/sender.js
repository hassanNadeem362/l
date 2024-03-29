// const nodemailer = require("nodemailer");
// const rateLimit = require("express-rate-limit");

// const sendEmail = (body, res, message) => {
//   const transporter = nodemailer.createTransport({
//     host: process.env.HOST,
//     service: process.env.SERVICE, //comment this line if you use a custom server/domain
//     port: process.env.EMAIL_PORT,
//     secure: true,
//     debug: true,
//     secureConnection: false,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: { rejectUnauthorized: true },
//   });

//   transporter.verify(function (err, success) {
//     if (err) {
//       res.status(403).send({
//         message: `Error happened when verify ${err.message}`,
//       });
//       console.log(err.message);
//     } else {
//       console.log("Server is ready to take our messages");

//       // Attempt to send the email
//       transporter.sendMail(body, (err, data) => {
//         if (err) {
//           console.log(
//             "🚀 ~ file: sender.js:118 ~ transporter.sendMail ~ err:",
//             err
//           );
//           res.status(403).send({
//             message: `Error happened when sending email ${err.message}`,
//           });
//         } else {
//           res.send({
//             message: message,
//           });
//         }
//       });
//     }
//   });
// };

// // Limit email verification and forget password
// const minutes = 30;
// const emailVerificationLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 3,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });

// const passwordVerificationLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 3,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });

// const supportMessageLimit = rateLimit({
//   windowMs: minutes * 60 * 1000,
//   max: 5,
//   handler: (req, res) => {
//     res.status(429).send({
//       success: false,
//       message: `You made too many requests. Please try again after ${minutes} minutes.`,
//     });
//   },
// });

// module.exports = {
//   sendEmail,
//   emailVerificationLimit,
//   passwordVerificationLimit,
//   supportMessageLimit,
// };
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const sendEmail = (body, res, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE, // Comment this line if you use a custom server/domain
    port: process.env.EMAIL_PORT,
    secure: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: true },
  });

  transporter.verify(function (err, success) {
    if (err) {
      res.status(403).send({
        message: `Error happened when verify ${err.message}`,
      });
      console.log(err.message);
    } else {
      console.log("Server is ready to take our messages");

      // Attempt to send the email
      transporter.sendMail(body, (err, data) => {
        if (err) {
          console.log(
            "🚀 ~ file: sender.js:118 ~ transporter.sendMail ~ err:",
            err
          );
          res.status(403).send({
            message: `Error happened when sending email ${err.message}`,
          });
        } else {
          // Only send the response once
          res.send({
            message: message,
          });
        }
      });
    }
  });
};
module.exports = {
  sendEmail
};