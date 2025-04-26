// routes/tasks.js
const express = require('express');
const router = express.Router();


// Simule une base de données en mémoire
let tasks = [
  { id: 1, title: 'Faire les courses', completed: false },
  { id: 2, title: 'Apprendre Express', completed: true }
];

// GET /tasks - Récupérer toutes les tâches
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Récupérer une tâche spécifique
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
  res.json(task);
});

// POST /tasks - Créer une nouvelle tâche
router.post('/', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Mettre à jour une tâche existante
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

// DELETE /tasks/:id - Supprimer une tâche
router.delete('/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).end();
});

module.exports = router;