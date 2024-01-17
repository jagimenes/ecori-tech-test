import { describe, it, expect } from "vitest";
import { Task } from "../../../../src/domain/entities/task";

describe("task tests", async () => {
  it("should create a task", async () => {
    const task = Task.create({
      title: "some title",
      description: "some description",
    });

    expect(task.id).toBeDefined();
  });

  it("should throw an error when task title is null", async () => {
    expect(() => {
      Task.create({
        title: null as unknown as string,
        description: "some description",
      });
    }).toThrowError("title is null");
  });

  it("should throw an error when task title is undefined", async () => {
    expect(() => {
      Task.create({
        title: undefined as unknown as string,
        description: "some description",
      });
    }).toThrowError("title is undefined");
  });
});
