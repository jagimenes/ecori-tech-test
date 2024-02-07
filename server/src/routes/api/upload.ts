import { Router } from "express";
import tasksController from "../../controllers/tasksController";

const router = Router();

router.post("/upload", tasksController.taskUpload);

export default router;
