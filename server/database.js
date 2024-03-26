const mongoose = require("mongoose");

require("dotenv").config();

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
