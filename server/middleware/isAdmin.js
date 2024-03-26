const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // L'utilisateur est admin, continuer à la prochaine middleware ou route
  } else {
    res.status(403).send("Accès refusé. Vous devez être administrateur.");
  }
};

module.exports = isAdmin;
