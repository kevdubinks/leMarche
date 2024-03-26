const Order = require("../modeles/Order");

// Créer une nouvelle commande
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    // Assurez-vous que req.user est défini grâce à votre middleware d'authentification
    const userId = req.user._id;
    const newOrder = new Order({
      user: userId,
      items,
      totalPrice,
      status: "pending", // Le statut initial de la commande
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Afficher les commandes de l'utilisateur
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id; // Assurez-vous que req.user est défini
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Mettre à jour le statut d'une commande (administrateur)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).send("Commande non trouvée");
    }
    res.json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
