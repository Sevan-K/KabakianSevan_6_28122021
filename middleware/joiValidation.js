// Joi module import
const Joi = require("joi");

// importing schemas
const schemas = require("./schemas");

// exporting function to validate email and password
exports.userValidation = (request, response, next) => {
  // checking if the body of the request matches the joi shema users
  const result = schemas.users.validate(request.body);
  // console.log(result.error);
  // if there is an error
  if (result.error) {
    // then return an error status and a message
    return response.status(400).json({
      message:
        "Password need at leat 8 characters (including a number, a capital letter and a special caracter) !",
    });
  }
  // if there is no error go to the next middleware
  next();
};
