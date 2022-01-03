// jsonwebtoken module import
const jsonwebtoken = require("jsonwebtoken");

// exporting the authentification module
module.exports = (request, response, next) => {
  // using a next to go to next middleware
  next();
};