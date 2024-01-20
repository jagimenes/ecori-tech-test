import { Task } from "../../../src/domain/entities/task";
import TaskRepository from "../../../src/domain/interfaces/repositories/task-repository";

export default class MockTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async update(input: Task): Promise<Task> {
    this.tasks.map((x) => {
      if (x.id === input.id) {
        x = input;
      }

      return x;
    });

    return input;
  }

  async findById(id: string): Promise<Task | undefined | null> {
    const output = this.tasks.find((x) => x.id === id);
    return Promise.resolve(output);
  }

  async create(input: Task): Promise<Task> {
    this.tasks.push(input);
    return Promise.resolve(input);
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter((x) => x.id !== id);
  }
}
