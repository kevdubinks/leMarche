const Review = require("../modeles/reviewModels");
const Product = require("../modeles/productsModels");

// Ajouter un avis sur un produit
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params; // L'ID du produit est passé dans l'URL

    // Vérifiez si le produit existe
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send("Produit non trouvé");
    }

    // Créez et sauvegardez l'avis
    const review = new Review({
      product: productId,
      user: req.user._id, // Assurez-vous que req.user est défini par votre middleware d'authentification
      rating,
      comment,
    });

    await review.save();

    // Optionnel : Mettre à jour le produit avec de nouvelles informations d'avis, par exemple, recalculer la note moyenne

    res.status(201).json(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Afficher tous les avis d'un produit
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "username"
    );

    if (reviews.length === 0) {
      return res.status(404).send("Aucun avis trouvé pour ce produit");
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
