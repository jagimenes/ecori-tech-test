import { Task } from "../../entities/task";

type SearchFields = {
  title?: string;
  description?: string;
};

type Pagination = {
  page?: number;
  size?: number;
};

type ListTaskInput = {
  searchFields?: SearchFields;
  pagination?: Pagination;
};

export default interface TaskRepository {
  list(input: ListTaskInput): Promise<Task[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | undefined | null>;
  update(input: Task): Promise<Task>;
  create(input: Task): Promise<Task>;
}
