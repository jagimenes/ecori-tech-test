import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../../../src/app";
import { makeCreateTask } from "../../../../src/application/factories/task";
import PgTaskRepository from "../../../../src/infra/pg/repositories/pg-task-repository";
import { Task } from "../../../../src/domain/entities/task";
import { TestUtil } from "../../../../vitest.integration.setup";

describe("task controller tests", async () => {
  it("should create a task", async () => {
    const response = await request(app)
      .post("/tasks")
      .set("Authorization", TestUtil.token)
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
      .set("Authorization", TestUtil.token)
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

    const response = await request(app)
      .delete(`/tasks/${task.id}`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
  });

  it("should list a total of 10 tasks from first page", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?page=0&size=10`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(10);
  });

  it("should list a total of 10 tasks from second page but it has only one", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?page=1&size=10`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(1);
  });

  it("should list tasks filtered by title", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?title=some%20title%208`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(1);
  });

  it("should list tasks filtered by description", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?description=some%20description%208`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(1);
  });

  it("should list tasks filtered by description and title", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?description=some%20description%208&title=some%20title%208`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(1);
  });

  it("should not find tasks filtered by description and title", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);
    for (let i = 0; i < 11; i++) {
      await createTask.execute({
        title: `some title ${i}`,
        description: `some description ${i}`,
      });
    }

    const response = await request(app)
      .get(`/tasks?description=some%20description%208&title=some%20title%209`)
      .set("Authorization", TestUtil.token)
      .send();

    expect(response.statusCode).toBe(200);
    expect((response.body as Task[]).length).toBe(0);
  });

  it("should mark task as done", async () => {
    const taskRepository = new PgTaskRepository();
    const createTask = makeCreateTask(taskRepository);

    const task = await createTask.execute({
      title: `some title`,
      description: `some description`,
    });

    const response = await request(app)
      .patch(`/tasks/${task.id}`)
      .set("Authorization", TestUtil.token)
      .send();

    const completedTask = await taskRepository.findById(task.id);

    expect(response.statusCode).toBe(200);
    expect(completedTask.completed_at).instanceOf(Date);
  });
});
