import { Router } from "express";
import TasksController from "../../controllers/TasksController";

const router = Router();

router
  .get("/", TasksController.getAllTasks)
  .get("/:id", TasksController.getTaskById)
  .post("/", TasksController.createNewTask)
  .put("/:id", TasksController.updateTask)
  .patch("/:id", TasksController.updateTask)
  .delete("/:id", TasksController.deleteTask);

export default router;
