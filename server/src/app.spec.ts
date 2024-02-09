import app from "./app";
import request from "supertest";
import TaskService from "./services/TaskService";

const mockTaskService = TaskService as jest.Mocked<typeof TaskService>;

jest.mock("./services/TaskService");

describe("GET /tasks", () => {
  it("should return all tasks", async () => {
    const expectedData = [
      {
        id: 1,
        title: "Title test",
        description: "Description test",
        created_at: "2024-02-07 18:38:02.794686",
        updated_at: "2024-02-07 18:38:33.728024",
        completed_at: "2024-02-07 18:39:04.242229",
        completed: true,
      },
    ];

    mockTaskService.getAllTasks.mockResolvedValue(expectedData);

    const response = await request(app).get(`/tasks`);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty("tasks", expectedData);
  });

  it("should return a task with the provided ID", async () => {
    const expectedData = {
      id: 2,
      title: "Title test",
      description: "Description test",
      created_at: "2024-02-07 18:38:02",
      updated_at: "2024-02-07 18:38:33",
      completed_at: "2024-02-07 18:39:04",
      completed: true,
    };

    mockTaskService.getTaskById.mockResolvedValue(expectedData);

    const response = await request(app).get(`/tasks/${2}`);

    expect(response.statusCode).toEqual(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty("id", expectedData.id);
  });
});

describe("POST /tasks", () => {
  it("should return the task created", async () => {
    const expectedData = {
      id: 3,
      title: "Title test",
      description: "Description test",
      created_at: "2024-02-07 18:38:02",
      updated_at: "2024-02-07 18:38:33",
      completed_at: "2024-02-07 18:39:04",
      completed: true,
    };

    mockTaskService.createNewTask.mockResolvedValue(expectedData);

    const response = await request(app).post(`/tasks`);

    expect(response.statusCode).toEqual(201);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty("id", expectedData.id);
  });
});

describe("PUT /tasks/:id", () => {
  it("should update a task successfully", async () => {
    const taskId = "4";
    const newTitle = "Updated Title";
    const newDescription = "Updated Description";

    const expectedUpdatedData = {
      id: taskId,
      title: newTitle,
      description: newDescription,
      created_at: "2024-02-07 18:38:02.794686",
      updated_at: "2024-02-07 18:38:33.728024",
      completed_at: "2024-02-07 18:39:04.242229",
      completed: true,
    };

    mockTaskService.updateTask.mockResolvedValue(expectedUpdatedData);

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ title: newTitle, description: newDescription });

    expect(response.statusCode).toEqual(200);
    expect(TaskService.updateTask).toHaveBeenCalledWith({
      taskId,
      title: newTitle,
      description: newDescription,
    });
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual(expectedUpdatedData);
  });
});

describe("DELETE /tasks/:id", () => {
  it("should return the task deleted", async () => {
    const taskId = "5";

    const expectedData = {
      id: taskId,
      title: "Title test",
      description: "Description test",
      created_at: "2024-02-07 18:38:02",
      updated_at: "2024-02-07 18:38:33",
      completed_at: "2024-02-07 18:39:04",
      completed: true,
    };

    mockTaskService.deleteTask.mockResolvedValue(expectedData);

    const response = await request(app).delete(`/tasks/${taskId}`);

    expect(TaskService.deleteTask).toHaveBeenCalledWith(taskId);
    expect(response.statusCode).toEqual(200);
    expect(response.type).toMatch(/json/);
    expect(response.body.task).toHaveProperty("id", expectedData.id);
  });
});

describe("PUT /task/:id", () => {
  it(`should return "message": "Task has been completed"`, async () => {
    const taskId = "1";

    const expectedData = {
      message: "Task has been completed",
    };

    mockTaskService.completeTask.mockResolvedValue(expectedData);

    const response = await request(app).put(`/task/${taskId}`);

    expect(TaskService.completeTask).toHaveBeenCalledWith(taskId);
    expect(response.statusCode).toEqual(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual(expectedData);
  });
});
