import { AppError } from "../../../domain/exception/app-error";
import TaskRepository from "../../../domain/interfaces/repositories/task-repository";

type SearchFields = {
  title?: string;
  description?: string;
};

type Pagination = {
  page?: number;
  size?: number;
};

export type ListTaskInput = {
  searchFields?: SearchFields;
  pagination?: Pagination;
};

export class ListTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  execute = async ({ searchFields, pagination }: ListTaskInput) => {
    const output = await this.taskRepository.list({ searchFields, pagination });

    return output;
  };
}
