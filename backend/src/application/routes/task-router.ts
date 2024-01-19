import { Router } from "express";
import TaskController from "../controllers/task-controller";
import PgTaskRepository from "../../infra/pg/repositories/pg-task-repository";
import {
  makeCompleteTask,
  makeCreateTask,
  makeDeleteTask,
  makeListTask,
  makeUpdateTask,
} from "../factories/task";
import authenticationHandler from "../middlewares/authentication-handler";
import ImportTaskController from "../controllers/import-task-controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const taskRouter = Router();

const taskRepository = new PgTaskRepository();

const createTask = makeCreateTask(taskRepository);
const updateTask = makeUpdateTask(taskRepository);
const deleteTask = makeDeleteTask(taskRepository);
const listTask = makeListTask(taskRepository);
const completeTask = makeCompleteTask(taskRepository);

const taskController = new TaskController(
  createTask,
  updateTask,
  deleteTask,
  listTask,
  completeTask
);

const importTaskController = new ImportTaskController(createTask);

taskRouter.use(authenticationHandler);

taskRouter.post("/", taskController.create);
taskRouter.put("/:id", taskController.update);
taskRouter.delete("/:id", taskController.delete);
taskRouter.get("/", taskController.list);
taskRouter.patch("/:id", taskController.complete);
taskRouter.post(
  "/csvImport",
  upload.single("csvFile"),
  importTaskController.create
);

export default taskRouter;
