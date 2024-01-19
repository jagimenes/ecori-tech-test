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
  return new UpdateTask(repository);
}

export function makeDeleteTask(repository: TaskRepository): DeleteTask {
  return new DeleteTask(repository);
}

export function makeListTask(repository: TaskRepository): ListTask {
  return new ListTask(repository);
}

export function makeCompleteTask(repository: TaskRepository): CompleteTask {
  return new CompleteTask(repository);
}
