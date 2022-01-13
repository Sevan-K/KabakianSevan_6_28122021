// Joi module import
const Joi = require("joi");

// importing schemas
const schemas = require("./schemas");

exports.userValidation = (request, response, next) => {
  const result = schemas.users.validate(request.body);
  if (result.error) {
    response.status(400).json({
      message:
        "Password need at leat 8 characters (including a number, a capital letter and a special caracter) !",
    });
  }
  next();
};
