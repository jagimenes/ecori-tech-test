import { Task } from "../../../domain/entities/task";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";

export type CreateTaskInput = {
  title: string;
  description: string;
};

export class CreateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute = async ({ title, description }: CreateTaskInput) => {
    const task = Task.create({ title, description });
    const output = await this.taskRepository.create(task);
    return output;
  };
}
