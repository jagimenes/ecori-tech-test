import { AppError } from "../../../domain/exception/app-error";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";

export class DeleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute = async (id: string) => {
    const result = await this.taskRepository.findById(id);

    if (!result) throw new AppError("task not found");

    await this.taskRepository.delete(id);
  };
}
