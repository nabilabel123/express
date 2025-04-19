const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.send('Liste des commandes'));
module.exports = router;
