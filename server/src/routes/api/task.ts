import { Router, Request, Response } from "express";
import TasksController from "../../controllers/TasksController";

const router = Router();

router.put("/:id", TasksController.taskCompleted);

export default router;
