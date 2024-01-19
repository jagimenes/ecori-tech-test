import { Task } from "../../../domain/entities/task";
import { AppError } from "../../exception/app-error";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";

export type UpdateTaskInput = {
  id: string;
  title: string;
  description: string;
};

export class UpdateTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute = async ({ id, title, description }: UpdateTaskInput) => {
    const result = await this.taskRepository.findById(id);

    if (!result) throw new AppError("task not found");

    const task = Task.create({
      ...result,
      title,
      description,
      updated_at: new Date(),
    });

    const output = await this.taskRepository.update(task);

    return output;
  };
}
