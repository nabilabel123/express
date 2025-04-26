const express = require('express');
const router = express.Router();

// Base de données fictive pour les utilisateurs
const users = [
  { id: 1, name: 'Latifa', email: 'latifa@gmail.com' },
  { id: 2, name: 'Rihame', email: 'rihameerradi@gmail.com' },
  { id: 3, name: 'Youness Erradi', email: 'younesserradi@gmail.com' }
];

// Middleware spécifique aux utilisateurs (exemple)
router.use((req, res, next) => {
  console.log('Middleware utilisateurs:', new Date().toISOString());
  next();
});

// GET tous les utilisateurs
router.get('/', (req, res) => {
  res.json(users);
});

// GET un utilisateur spécifique par ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  res.json(user);
});

// POST créer un nouvel utilisateur
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Le nom et l\'email sont requis' });
  }
  
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newId, name, email };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT mettre à jour un utilisateur
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
});

// DELETE supprimer un utilisateur
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'Utilisateur supprimé', user: deletedUser });
});

module.exports = router;