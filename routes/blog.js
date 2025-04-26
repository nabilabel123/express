const express = require('express');
const router = express.Router();

// Données fictives pour la démonstration
const posts = [
  { id: 1, title: 'Introduction à Express', date: '2023-01-15', category: 'nodejs' },
  { id: 2, title: 'Routes avec Express', date: '2023-02-10', category: 'nodejs' },
  { id: 3, title: 'Middlewares en Express', date: '2023-03-05', category: 'nodejs' },
  { id: 4, title: 'API REST avec Express', date: '2024-01-20', category: 'api' },
  { id: 5, title: 'Express avec MongoDB', date: '2024-03-15', category: 'database' },
  { id: 6, title: 'Sécurité en Express', date: '2024-04-10', category: 'security' }
];

// GET /posts/:year/:month? - Récupérer les articles d'une année et optionnellement d'un mois spécifique
router.get('/posts/:year/:month', (req, res) => {
  const year = parseInt(req.params.year);
  const month = req.params.month ? parseInt(req.params.month) : null;

  // Filtrer les articles par année
  let filteredPosts = posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getFullYear() === year;
  });

  // Si un mois est spécifié, filtrer davantage
  if (month !== null) {
    filteredPosts = filteredPosts.filter(post => {
      const postDate = new Date(post.date);
      // Note: getMonth() retourne un index de 0-11, donc +1 pour correspondre aux mois 1-12
      return postDate.getMonth() + 1 === month;
    });
  }

  if (filteredPosts.length === 0) {
    return res.status(404).json({ message: 'Aucun article trouvé pour cette période' });
  }

  res.json(filteredPosts);
});

// GET /categories/:categoryName/posts - Récupérer les articles d'une catégorie spécifique
router.get('/categories/:categoryName/posts', (req, res) => {
  const categoryName = req.params.categoryName.toLowerCase();
  
  const filteredPosts = posts.filter(post => post.category === categoryName);

  if (filteredPosts.length === 0) {
    return res.status(404).json({ message: 'Aucun article trouvé pour cette catégorie' });
  }

  res.json(filteredPosts);
});

module.exports = router;