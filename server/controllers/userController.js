const User = require("../modeles/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Supposons que vous avez une fonction pour générer des JWT

// Fonction pour générer un JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Vérifier si l'email est déjà utilisé
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("L'email est déjà utilisé.");
    }
    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);
    // Création de l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    // Génération du token JWT
    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).send("Erreur serveur.");
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Identifiants invalides.");
    }
    // Génération du token JWT
    const token = generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    res.status(500).send("Erreur serveur.");
  }
};

// Profil de l'utilisateur
exports.getUserProfile = async (req, res) => {
  try {
    // Assumant que vous avez un middleware d'authentification qui définit req.user
    res.json(req.user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
