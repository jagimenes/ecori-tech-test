import { Router, Request, Response } from "express";
import tasksController from "../../controllers/tasksController";

const router = Router();

router.put("/:id", tasksController.taskCompleted);

export default router;
