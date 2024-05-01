const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const apiRoute = require("./routes/apiRoutes");
// Importation de la configuration de la base de données
require("./database");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par `window` (ici, par 15 minutes)
  standardHeaders: true, // Retourne les infos du rate limit dans les headers `RateLimit-*`
  legacyHeaders: false, // Désactive les headers `X-RateLimit-*`
});
app.use(
  cors({
    origin: "http://localhost:5173", // URL de votre front-end
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    credentials: true, // Permet le support des sessions entre les domaines
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(limiter);
app.get("/", (req, res) => {
  res.send("LeMarché.fr est en ligne !");
});
app.use(express.json());

app.use("/api", apiRoute);
app.listen(port, () => {
  console.log(`LeMarché.fr écoutant sur le port ${port}`);
});
module.exports = app;
