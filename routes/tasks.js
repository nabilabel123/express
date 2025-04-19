const express = require('express');
const router = express.Router();

// Données simulées en mémoire
let tasks = [
  { id: 1, title: 'Tâche 1', completed: false },
  { id: 2, title: 'Tâche 2', completed: true },
];

// GET /tasks - Récupérer toutes les tâches
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Récupérer une tâche spécifique
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(task);
});

// POST /tasks - Créer une nouvelle tâche
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: Date.now(), title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Mettre à jour une tâche
router.put('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Tâche non trouvée' });
  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

// DELETE /tasks/:id - Supprimer une tâche
router.delete('/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.status(204).send();
});

module.exports = router;
router.get('/', (req, res) => {
  console.log('GET /tasks appelée');
  res.json(tasks);
});

