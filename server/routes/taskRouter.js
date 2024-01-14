const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  createTask,
} = require('../controllers/taskController.js');

router.post('/tasks', createTask);
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
