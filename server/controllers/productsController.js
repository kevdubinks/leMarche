const Product = require("../modeles/productsModels");

// Obtenir tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtenir un produit par son ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Produit non trouvé");
    res.json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Ajouter un nouveau produit

exports.addProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      inStock: req.body.inStock,
      image: req.file.buffer, // Stockez le buffer de l'image
      category: req.body.category,
    });

    await product.save();
    res
      .status(201)
      .send({ message: "Product added successfully", productId: product._id });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).send("Produit non trouvé");
    res.json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).send("Produit non trouvé");
    res.send("Produit supprimé avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getNewestProducts = async (req, res) => {
  try {
    // Trouver les 3 derniers produits ajoutés
    const products = await Product.find().sort({ createdAt: -1 }).limit(3);
    res.json(products);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
