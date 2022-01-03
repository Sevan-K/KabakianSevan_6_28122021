// import of express package
const express = require("express");

// create the router constant using the Router express method
const router = express.Router();

// ipmorting user's controlers
const userControler = require("../controlers/user");

// adding the routes
// sign up route
router.post("/signup", userControler.signup);
// log in route
router.post("/login", userControler.login);

// export the router
module.exports = router;
