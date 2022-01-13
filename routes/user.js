// import of express package
const express = require("express");

// create the router constant using the Router express method
const router = express.Router();

// importing user's controlers
const userControler = require("../controlers/user");

// importing joi validation middleware
const joiValidation = require("../middleware/joiValidation");

// adding the routes
// sign up route
router.post("/signup", joiValidation.userValidation, userControler.signup);
// log in route
router.post("/login", userControler.login);

// export the router
module.exports = router;
