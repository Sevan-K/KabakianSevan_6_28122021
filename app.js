const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.end("Voilà la réponse de la première version du serveur !");

  next();
});

app.use(express.json());

module.exports = app;
