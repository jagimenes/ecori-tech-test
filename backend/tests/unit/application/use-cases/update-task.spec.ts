import { describe, it, expect } from "vitest";

import MockTaskRepository from "../../mocks/mock-task-repository";
import {
  makeCreateTask,
  makeUpdateTask,
} from "../../../../src/application/factories/task";

describe("update task tests", async () => {
  it("should update a task", async () => {
    const repository = new MockTaskRepository();
    const createTask = makeCreateTask(repository);

    const taskInput = {
      description: "Some description",
      title: "Some title",
    };

    const task = await createTask.execute(taskInput);

    const updateTask = makeUpdateTask(repository);

    task.description = "some another description";

    const result = await updateTask.execute(task);

    expect(result.id).toBeDefined();
  });
});
