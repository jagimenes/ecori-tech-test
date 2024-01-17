import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../../../src/app";
import { makeCreateTask } from "../../../../src/application/factories/task";
import PgTaskRepository from "../../../../src/infra/pg/repositories/pg-task-repository";
import { Task } from "../../../../src/domain/entities/task";

describe("task controller tests", async () => {
  it("should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("content-type", "application/json")
      .send({
        description: "Some description",
        title: "Some title",
      });

    expect(response.statusCode).toBe(201);
  });

  it("should update a task", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    const task = await createTask.execute({
      title: "some title",
      description: "some description",
    });

    task.description = "Some another description";
    task.title = "Some another title";

    const response = await request(app)
      .put(`/tasks/${task.id}`)
      .set("content-type", "application/json")
      .send(task);

    expect(response.statusCode).toBe(200);
    expect((response.body as Task).description).toBe(task.description);
    expect((response.body as Task).title).toBe(task.title);
  });

  it("should delete a task", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    const task = await createTask.execute({
      title: "some title",
      description: "some description",
    });

    const response = await request(app).delete(`/tasks/${task.id}`).send();

    expect(response.statusCode).toBe(200);
  });
});
