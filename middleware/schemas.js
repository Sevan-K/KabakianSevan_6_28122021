// Joi module import
const Joi = require("joi");

// regex for password
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

// creating schemas and their properties
const schemas = {
  // users schema containing an email and a password
  users: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
  }),
};

// exporting schemas
module.exports = schemas;
