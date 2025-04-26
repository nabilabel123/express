const express = require('express');
const router = express.Router();

// Formulaire d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Traitement du formulaire
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const errors = [];
  if (!name || !email || !password) {
    errors.push('Tous les champs sont obligatoires.');
  }
  if (password.length < 6) {
    errors.push('Le mot de passe doit contenir au moins 6 caractères.');
  }

  if (errors.length > 0) {
    return res.render('register', { errors, name, email });
  }

  // Ici, tu pourrais enregistrer dans MongoDB (via Prisma ou Mongoose)
  // Pour l'instant, on montre une confirmation
  res.render('confirmation', { name });
});

module.exports = router;