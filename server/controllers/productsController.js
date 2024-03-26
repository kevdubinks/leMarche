const Product = require("../modeles/Product");

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
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).send(error.message);
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
