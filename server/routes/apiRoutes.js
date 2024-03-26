const express = require("express");
const router = express.Router();

// Importation des middlewares
const isAdmin = require("../middlewares/isAdmin");
const authenticate = require("../middlewares/authenticate"); // Correction du chemin

// Importation des contrôleurs
const productsController = require("../controllers/productsController");
const usersController = require("../controllers/usersController");
const ordersController = require("../controllers/ordersController");
const reviewsController = require("../controllers/reviewsController");

router.get("/api/protected", authenticate, (req, res) => {
  res.send("Accès autorisé");
});

// Route pour ajouter un avis sur un produit
router.post(
  "/products/:productId/reviews",
  authenticate,
  reviewsController.addReview
);

// Route pour obtenir tous les avis sur un produit
router.get("/products/:productId/reviews", reviewsController.getProductReviews);

// Routes pour les produits accessibles par tous les utilisateurs
router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductById);

// Routes pour la gestion des produits (administrateurs uniquement)
router.post("/products/add", isAdmin, productsController.addProduct);
router.put("/products/:id", isAdmin, productsController.updateProduct);
router.delete("/products/:id", isAdmin, productsController.deleteProduct);

// Routes pour l'inscription et la connexion des utilisateurs
router.post("/users/register", usersController.register);
router.post("/users/login", usersController.login);

// Route pour obtenir le profil de l'utilisateur connecté
router.get("/users/me", authenticate, usersController.getUserProfile); // Ajout de authenticate pour sécuriser la route

// Routes pour la gestion des commandes par l'utilisateur
router.post("/orders", authenticate, ordersController.createOrder); // Sécurisation de la création de commande
router.get("/orders/my", authenticate, ordersController.getUserOrders); // Sécurisation de la consultation des commandes

// Routes pour la gestion des commandes (administrateurs uniquement)
router.put("/orders/:id/status", isAdmin, ordersController.updateOrderStatus);

module.exports = router;
