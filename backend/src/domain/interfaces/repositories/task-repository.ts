import { Task } from "../../entities/task";

export default interface TaskRepository {
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Task | undefined | null>;
  update(input: Task): Promise<Task>;
  create(input: Task): Promise<Task>;
}
