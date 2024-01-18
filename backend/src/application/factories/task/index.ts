import TaskRepository from "../../../domain/interfaces/repositories/task-repository";
import {
  CreateTask,
  UpdateTask,
  DeleteTask,
  ListTask,
  CompleteTask,
} from "../../use-cases/task";

export function makeCreateTask(repository: TaskRepository): CreateTask {
  const taskRepository = repository;
  const createTask = new CreateTask(taskRepository);
  return createTask;
}

export function makeUpdateTask(repository: TaskRepository): UpdateTask {
  const taskRepository = repository;
  const updateTask = new UpdateTask(taskRepository);
  return updateTask;
}

export function makeDeleteTask(repository: TaskRepository): DeleteTask {
  const taskRepository = repository;
  const deleteTask = new DeleteTask(taskRepository);
  return deleteTask;
}

export function makeListTask(repository: TaskRepository): ListTask {
  const taskRepository = repository;
  const listTask = new ListTask(taskRepository);
  return listTask;
}

export function makeCompleteTask(repository: TaskRepository): CompleteTask {
  const taskRepository = repository;
  const completeTask = new CompleteTask(taskRepository);
  return completeTask;
}
