const express = require('express');
const router = express.Router();

router.get('/posts/:year/:month?', (req, res) => {
  const { year, month } = req.params;
  res.send(`Articles publiés en ${year}${month ? ' mois ' + month : ''}`);
});

router.get('/categories/:categoryName/posts', (req, res) => {
  const { categoryName } = req.params;
  res.send(`Articles dans la catégorie "${categoryName}"`);
});

module.exports = router;
