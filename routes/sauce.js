/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// import of express package
const express = require("express");

// create the router constant using the Router express method
const router = express.Router();

// ipmorting user's controlers
const sauceControler = require("../controlers/sauce");

// importing auth middleware
const auth = require("../middleware/auth");

// importing multer middleware
const multer = require("../middleware/multer-config");

/* ------------------------ */
/*      Routes section      */
/* ------------------------ */
// route to get all the sauces
router.get("/", auth, sauceControler.getAllSauces);
// route to get one sauce based on its id
router.get("/:id", auth, sauceControler.getOneSauce);
// route to create a new sauce
router.post("/", auth, multer, sauceControler.createSauce);
// route to modify an existing sauce
router.put("/:id", auth, multer, sauceControler.modifySauce);
// route to delete an existing sauce
router.delete("/:id", auth, sauceControler.deleteSauce);

/* ------------------------ */
/*      Export section      */
/* ------------------------ */
module.exports = router;
