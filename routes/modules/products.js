const express = require('express');
const router = express.Router();

// Base de données fictive pour les produits
const products = [
  { id: 1, name: 'Ordinateur portable', price: 8999.00, stock: 15 },
  { id: 2, name: 'Smartphone', price: 6299.99, stock: 25 },
  { id: 3, name: 'Écouteurs sans fil', price: 849.99, stock: 50 }
];

// Middleware spécifique aux produits (exemple)
router.use((req, res, next) => {
  console.log('Middleware produits:', new Date().toISOString());
  next();
});

// GET tous les produits
router.get('/', (req, res) => {
  res.json(products);
});

// GET un produit spécifique par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  
  if (!product) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }
  
  res.json(product);
});

// POST créer un nouveau produit
router.post('/', (req, res) => {
  const { name, price, stock } = req.body;
  
  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({ message: 'Le nom, le prix et le stock sont requis' });
  }
  
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = { id: newId, name, price: parseFloat(price), stock: parseInt(stock) };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT mettre à jour un produit
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }
  
  // Mise à jour des propriétés
  if (req.body.price !== undefined) {
    req.body.price = parseFloat(req.body.price);
  }
  
  if (req.body.stock !== undefined) {
    req.body.stock = parseInt(req.body.stock);
  }
  
  products[productIndex] = { ...products[productIndex], ...req.body };
  res.json(products[productIndex]);
});

// DELETE supprimer un produit
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Produit non trouvé' });
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  res.json({ message: 'Produit supprimé', product: deletedProduct });
});

module.exports = router;