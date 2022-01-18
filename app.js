/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// import of express package
const express = require("express");

// application constant
const app = express();

// dotenv module import
require("dotenv").config();

// helmet module import
const helmet = require("helmet");

// mongoose module import
const mongoose = require("mongoose");

// path package import
const path = require("path");

// import routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

/* ------------------------------------- */
/*      Mongoose connection section      */
/* ------------------------------------- */
mongoose
  .connect(
    "mongodb+srv://sevankabakian:mongodbOCR@cluster0.jiiyo.mongodb.net/piiquante?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

/* ---------------------------- */
/*      Middleware section      */
/* ---------------------------- */
// helmet middleware
app.use(
  helmet.crossOriginResourcePolicy(
    //setting crossOriginResourcePolicy to cross-origin to avoid conflict with the header we set later
    { policy: "cross-origin" }
  )
);

// middleware to add headers to responses
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// code to intercept request that have a JSON type content
app.use(express.json());

// setting file to serve when /images route is used
app.use("/images", express.static(path.join(__dirname, "images")));

// precising adresses of rooters
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

/* ------------------------ */
/*      Export section      */
/* ------------------------ */
// export the app
module.exports = app;
