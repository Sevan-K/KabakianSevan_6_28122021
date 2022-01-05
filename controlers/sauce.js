/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// sauce model import
const Sauce = require("../models/Sauce");

// bcrypt module import
const bcrypt = require("bcrypt");

// jsonwebtoken module import
const jasonwebtoken = require("jsonwebtoken");
const { request, response } = require("express");

/* -------------------------------- */
/*      Get controlers section      */
/* -------------------------------- */
// exporting the controler to get all the sauces
exports.getAllSauces = (request, response, next) => {
  // finding all the sauces
  Sauce.find()
    // if it is OK set the answer to 200 and send sauces
    .then((sauces) => response.status(200).json({ sauces }))
    // if not send the error
    .catch((error) => response.status(400).json({ error }));
};

// exporting the controler to get one sauce
exports.getOneSauce = (request, response, next) => {
  // find the sauce which id is in the parameters of the request
  Sauce.findOne({ _id: request.params.id })
    // if it is OK set the answer to 200 and send the sauce
    .then((sauce) => {
      response.status(201).json({ sauce });
    })
    // if not send the error
    .catch((error) => response.status(400).json({ error }));
};

/* --------------------------------- */
/*      Post controlers section      */
/* --------------------------------- */
// exporting route to create sauces
exports.createSauce = (request, response, next) => {
  // recover the sauce object from the request
};
