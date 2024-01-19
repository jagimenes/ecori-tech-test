import { Task } from "../../../domain/entities/task";
import { AppError } from "../../exception/app-error";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";

export class CompleteTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute = async (id: string) => {
    const result = await this.taskRepository.findById(id);

    if (!result) throw new AppError("task not found");

    const currentDate = new Date();
    const task = Task.create({
      ...result,
      completed_at: currentDate,
      updated_at: currentDate,
    });

    const output = await this.taskRepository.update(task);

    return output;
  };
}
