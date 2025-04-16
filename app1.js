const express = require('express');
const path = require('path');
const app = express();
const tasksRouter = require('./routes/tasks');

// Middleware JSON
app.use(express.json());

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Route API
app.use('/tasks', tasksRouter);

// Accueil personnalisé
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index2.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur prêt sur http://localhost:${PORT}`);
});
