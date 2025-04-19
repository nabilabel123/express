const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

app.use(express.json()); // Pour lire les corps de requêtes JSON
app.use('/tasks', tasksRouter);

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion de tâches');
  });
  