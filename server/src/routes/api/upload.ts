import { Router } from "express";
import TasksController from "../../controllers/TasksController";

const router = Router();

router.post("/upload", TasksController.taskUpload);

export default router;
