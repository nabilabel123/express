const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Liste des utilisateurs');
});

router.get('/:id', (req, res) => {
  res.send(`Utilisateur avec l'ID : ${req.params.id}`);
});

module.exports = router;