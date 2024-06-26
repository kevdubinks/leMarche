const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const isAdmin = require("../middleware/isAdmin");
const authenticate = require("../middleware/authenticate");

const productsController = require("../controllers/productsController");
const usersController = require("../controllers/userController");
const ordersController = require("../controllers/orderController");
const reviewsController = require("../controllers/reviewController");
const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite la taille du fichier à 5MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      // Assurez que le fichier est une image
      return cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});
// Fonction de gestion des erreurs de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array().map((error) => error.msg) });
  }
  next();
};

// Routes d'inscription et de connexion des utilisateurs
router.post(
  "/users/register",
  [
    body("username").notEmpty().withMessage("Le nom d’utilisateur est requis."),
    body("email").isEmail().withMessage("L’email doit être valide."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères."),
  ],
  validate,
  usersController.register
);

router.post(
  "/users/login",
  [
    body("email").isEmail().withMessage("L’email doit être valide."),
    body("password").notEmpty().withMessage("Le mot de passe est requis."),
  ],
  validate,
  usersController.login
);

// Route pour obtenir le profil de l'utilisateur connecté
router.get("/users/me", authenticate, usersController.getUserProfile);

// Routes des produits
router.get("/products", productsController.getAllProducts);
router.get("/products/:id", productsController.getProductById);

router.post(
  "/products/add",
  authenticate,
  isAdmin,
  upload.single("image"), // 'image' est le nom du champ dans le formulaire de requête
  [
    body("name").notEmpty().withMessage("Le nom du produit est requis."),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Le prix doit être un nombre positif."),
  ],
  validate,
  productsController.addProduct
);

router.put(
  "/products/:id",
  authenticate,
  isAdmin,
  [
    body("name").notEmpty().withMessage("Le nom du produit est requis."),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Le prix doit être un nombre positif."),
  ],
  validate,
  productsController.updateProduct
);

router.delete(
  "/products/:id",
  authenticate,
  isAdmin,
  productsController.deleteProduct
);
router.get("/newest", productsController.getNewestProducts);

// Routes des avis
router.post(
  "/products/:productId/reviews",
  authenticate,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("La note doit être entre 1 et 5."),
    body("comment")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Le commentaire doit contenir moins de 500 caractères."),
  ],
  validate,
  reviewsController.addReview
);

router.get("/products/:productId/reviews", reviewsController.getProductReviews);

// Routes des commandes
router.post(
  "/orders",
  authenticate,
  [
    body("items.*.productId")
      .notEmpty()
      .withMessage("L’ID du produit est requis."),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("La quantité doit être au moins de 1."),
  ],
  validate,
  ordersController.createOrder
);

router.get("/orders/my", authenticate, ordersController.getUserOrders);

router.put(
  "/orders/:id/status",
  authenticate,
  isAdmin,
  [
    body("status")
      .notEmpty()
      .withMessage("Le statut de la commande est requis."),
  ],
  validate,
  ordersController.updateOrderStatus
);

module.exports = router;
