// routes/tasks.js
const express = require('express');
const router = express.Router();  // Use the router, not app

// Correct route definition using router
router.get('/:id?', (req, res) => {
  const taskId = req.params.id || 'No ID';
  res.send(`Task ID: ${taskId}`);
});

module.exports = router;  // Export the router
