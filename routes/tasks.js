const express = require('express');
const router = express.Router();

let tasks = [];
let currentId = 1;

// GET /tasks - Liste toutes les tâches
router.get('/', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - Tâche par ID
router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
  res.json(task);
});

// POST /tasks - Nouvelle tâche
router.post('/', (req, res) => {
  const { title, completed = false } = req.body;
  const newTask = { id: currentId++, title, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Modifier une tâche
router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });

  const { title, completed } = req.body;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

// DELETE /tasks/:id - Supprimer une tâche
router.delete('/:id', (req, res) => {
  const index2 = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index2 === -1) return res.status(404).json({ message: 'Tâche non trouvée' });

  const deletedTask = tasks.splice(index2, 1);
  res.json(deletedTask[0]);
});

module.exports = router;
