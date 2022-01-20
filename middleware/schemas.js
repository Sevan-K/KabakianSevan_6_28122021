// Joi module import
const { string } = require("joi");
const Joi = require("joi");

// regex for password
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
// regex for name and
const regexForNames =
  /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9. ']{2,20}(?<!-)(?<!'))$/;
// regex for name and
const regexForDescription =
  /^\b((?!-)(?!.*--)(?!')(?!.*'')[-A-ZÀ-ÿa-z0-9!,?. ']{2,100}(?<!-)(?<!'))$/;

// creating schemas and their properties
const schemas = {
  // users schema containing an email and a password
  users: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(passwordRegex).required(),
  }),
  // sauces schema
  sauces: Joi.object().keys({
    _id: Joi.string().required(),
    userId: Joi.string().required(),
    name: Joi.string().regex(regexForNames),
    manufacturer: Joi.string().regex(regexForNames),
    description: Joi.string().regex(regexForDescription),
    mainPepper: Joi.string().regex(regexForNames),
    heat: Joi.number().min(1).max(10).required(),
  }),
};

// exporting schemas
module.exports = schemas;
