import { Router } from "express";
import TaskController from "../controllers/task-controller";
import PgTaskRepository from "../../infra/pg/repositories/pg-task-repository";
import {
  makeCreateTask,
  makeDeleteTask,
  makeUpdateTask,
} from "../factories/task";

const taskRouter = Router();

const taskRepository = new PgTaskRepository();

const createTask = makeCreateTask(taskRepository);
const updateTask = makeUpdateTask(taskRepository);
const deleteTask = makeDeleteTask(taskRepository);

const taskController = new TaskController(createTask, updateTask, deleteTask);

taskRouter.post("/", taskController.create);
taskRouter.put("/:id", taskController.update);
taskRouter.delete("/:id", taskController.delete);

export default taskRouter;
