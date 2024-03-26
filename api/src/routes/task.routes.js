const { Router } = require("express");

const TaskController = require("../controllers/TasksController");

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.post('/', taskController.create);
taskRoutes.get('/:id', taskController.show);
taskRoutes.put('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);
taskRoutes.patch('/:id', taskController.toggleComplete);
taskRoutes.get('/', taskController.index);


module.exports = taskRoutes;