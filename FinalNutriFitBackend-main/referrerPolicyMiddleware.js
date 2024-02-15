// // // referrerPolicyMiddleware.js
// // const referrerPolicyMiddleware = (req, res, next) => {
// //     // Set the Referrer Policy header to "no-referrer"
// //     res.setHeader("Referrer-Policy", "no-referrer");
// //     next();
// //   };
  
// //   module.exports = referrerPolicyMiddleware;
//   // referrerPolicyMiddleware.js
// const referrerPolicyMiddleware = (req, res, next) => {
//     // Set the Referrer Policy header to "no-referrer"
//     res.setHeader("Referrer-Policy", "no-referrer");
//     next();
//   };
  
//   module.exports = referrerPolicyMiddleware;
  // referrerPolicyMiddleware.js
const referrerPolicyMiddleware = (req, res, next) => {
    // Set the Referrer Policy header to "no-referrer"
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
  };
  
  module.exports = referrerPolicyMiddleware;
  