const express = require('express');
const path = require('path');
const app = express();

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Import des routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Utilisation des routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
