const express = require('express');
const router = express.Router();

// Base de données fictive pour les commandes
const orders = [
  { 
    id: 1, 
    userId: 1, 
    date: '2025-04-15', 
    items: [
      { productId: 1, quantity: 1, price: 899.99 },
      { productId: 3, quantity: 2, price: 149.99 }
    ],
    status: 'livré'
  },
  { 
    id: 2, 
    userId: 2, 
    date: '2025-04-16', 
    items: [
      { productId: 2, quantity: 1, price: 599.99 }
    ],
    status: 'en préparation'
  }
];

// Middleware spécifique aux commandes (exemple)
router.use((req, res, next) => {
  console.log('Middleware commandes:', new Date().toISOString());
  next();
});

// GET toutes les commandes
router.get('/', (req, res) => {
  res.json(orders);
});

// GET commandes filtrées par utilisateur
router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userOrders = orders.filter(order => order.userId === userId);
  
  if (userOrders.length === 0) {
    return res.status(404).json({ message: 'Aucune commande trouvée pour cet utilisateur' });
  }
  
  res.json(userOrders);
});

// GET une commande spécifique par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find(order => order.id === id);
  
  if (!order) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  
  res.json(order);
});

// POST créer une nouvelle commande
router.post('/', (req, res) => {
  try {
    const { userId, items } = req.body;

    // Validation des données
// Validation des données
if (!userId || !items || !Array.isArray(items)) {
  return res.status(400).json({ 
    success: false,
    message: 'Données invalides: userId et items (array) sont requis'
  });
}

    if (items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La commande doit contenir au moins un article'
      });
    }

    // Validation des items
    for (const item of items) {
      if (!item.productId || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: `Article invalide: productId et quantity (>0) sont requis pour chaque article`
        });
      }
    }

    // Création de la nouvelle commande
    const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const newOrder = {
      id: newId,
      userId: parseInt(userId),
      date: today,
      items: items.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price) || 0 // Si le prix n'est pas fourni
      })),
      status: 'reçue'
    };

    orders.push(newOrder);
    
    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      order: newOrder
    });

  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création de la commande'
    });
  }
});


// PUT mettre à jour le statut d'une commande
router.put('/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  if (!status) {
    return res.status(400).json({ message: 'Le statut est requis' });
  }
  
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  
  orders[orderIndex].status = status;
  res.json(orders[orderIndex]);
});

// DELETE supprimer une commande
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const orderIndex = orders.findIndex(order => order.id === id);
  
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  
  const deletedOrder = orders.splice(orderIndex, 1)[0];
  res.json({ message: 'Commande supprimée', order: deletedOrder });
});

module.exports = router;