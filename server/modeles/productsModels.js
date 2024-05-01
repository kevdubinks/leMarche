const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    image: {
      // Modification ici pour utiliser un champ buffer pour l'image
      type: Buffer,
    },
    category: {
      type: String,
      required: true,
      enum: ["décoration", "vêtement", "musique"],
    },
    // Ajoutez d'autres champs selon les besoins.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
