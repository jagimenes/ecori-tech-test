import { describe, it, expect } from "vitest";

import MockTaskRepository from "../../mocks/mock-task-repository";
import { makeCreateTask } from "../../../../src/application/factories/task";

describe("create task tests", async () => {
  it("should create a task", async () => {
    const repository = new MockTaskRepository();
    const createTask = makeCreateTask(repository);

    const task = {
      description: "Some description",
      title: "Some title",
    };

    const result = await createTask.execute(task);

    expect(result.id).toBeDefined();
  });
});
