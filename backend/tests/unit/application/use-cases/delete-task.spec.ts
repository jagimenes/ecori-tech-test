import { describe, it, expect } from "vitest";

import MockTaskRepository from "../../mocks/mock-task-repository";
import {
  makeCreateTask,
  makeDeleteTask,
} from "../../../../src/application/factories/task";

describe("delete task tests", async () => {
  it("should delete a task", async () => {
    const repository = new MockTaskRepository();
    const createTask = makeCreateTask(repository);

    const taskInput = {
      description: "Some description",
      title: "Some title",
    };

    const task = await createTask.execute(taskInput);

    const deleteTask = makeDeleteTask(repository);

    expect(deleteTask.execute(task.id)).resolves.not.toThrowError();
  });
});
