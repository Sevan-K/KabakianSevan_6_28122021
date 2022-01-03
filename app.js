/* --------------------------------------- */
/*      Variables and imports section      */
/* --------------------------------------- */
// import of express package
const express = require("express");

// application constant
const app = express();

// mongoose module import
const mongoose = require("mongoose");

// import routes
// !!!!! to do !!!!!!

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
// middleware to add headers to responses
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use((req, res, next) => {
  res.end("Voilà la réponse de la première version du serveur !");

  next();
});

// code to intercept request that have a JSON type content
app.use(express.json());

// precising adresses of rooters
// !!!!! to do !!!!!!

/* ------------------------ */
/*      Export section      */
/* ------------------------ */
// export the app
module.exports = app;
