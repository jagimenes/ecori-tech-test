import { Router, Request, Response } from "express";
import tasksController from "../../controllers/tasksController";

const router = Router();

router
  .get("/", tasksController.getAllTasks)
  .post("/", tasksController.createNewTask)
  .put("/:id", tasksController.updateTask)
  .patch("/:id", tasksController.updateTask)
  .delete("/:id", tasksController.deleteTask);

export default router;
