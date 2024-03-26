const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Importation de la configuration de la base de données
require("./database");

app.get("/", (req, res) => {
  res.send("LeMarché.fr est en ligne !");
});

app.listen(port, () => {
  console.log(`LeMarché.fr écoutant sur le port ${port}`);
});
