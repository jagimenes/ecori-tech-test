const { Router } = require("express");
const multer = require("multer");

const TaskController = require("../controllers/TasksController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const upload = multer({ dest: "uploads/" });

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.use(ensureAuthenticated);

taskRoutes.post('/', taskController.create);
taskRoutes.get('/:id', taskController.show);
taskRoutes.put('/:id', taskController.update);
taskRoutes.delete('/:id', taskController.delete);
taskRoutes.patch('/:id', taskController.toggleComplete);
taskRoutes.get('/', taskController.index);
taskRoutes.post('/upload', upload.single("file"), taskController.upload);


module.exports = taskRoutes;