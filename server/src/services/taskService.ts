import pool from "../model/index";

interface TaskPayload {
  taskId?: string;
  title: string;
  description: string;
}

class TaskService {
  async getAllTasks({ titleFilters, descriptionFilters, page, pageSize }: any) {
    const client = await pool.connect();
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    let queryText = "SELECT * FROM tasks ORDER BY id LIMIT $1 OFFSET $2";
    let queryValues = [limit, offset];

    if (titleFilters !== undefined || descriptionFilters !== undefined) {
      queryText =
        "SELECT * FROM tasks WHERE title ILIKE $1 AND description ILIKE $2 ORDER BY id LIMIT $3 OFFSET $4";
      queryValues = [
        `%${titleFilters}%`,
        `%${descriptionFilters}%`,
        limit,
        offset,
      ];
    }

    try {
      const result = await client.query(queryText, queryValues);
      return result.rows;
    } finally {
      client.release();
    }
  }

  async getTaskById(taskId: string) {
    const client = await pool.connect();

    const queryText = "SELECT * FROM tasks WHERE id = $1";
    const queryValue = [taskId];

    try {
      const result = await client.query(queryText, queryValue);

      return result.rows;
    } finally {
      client.release();
    }
  }

  async createNewTask({ title, description }: TaskPayload) {
    const client = await pool.connect();

    const queryText =
      "INSERT INTO tasks(title, description) VALUES($1, $2) RETURNING *";
    const queryValues = [title, description];

    try {
      const result = await client.query(queryText, queryValues);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async updateTask({ taskId, title, description }: TaskPayload) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        "SELECT * FROM tasks WHERE id = $1 FOR UPDATE",
        [taskId]
      );

      if (!result.rows.length) {
        throw new Error(`Task ID: ${taskId} not found`);
      }

      const existingTask = result.rows[0];

      if (title !== undefined && title !== existingTask.title) {
        await client.query("UPDATE tasks SET title = $1 WHERE id = $2", [
          title,
          taskId,
        ]);
      }

      if (
        description !== undefined &&
        description !== existingTask.description
      ) {
        await client.query("UPDATE tasks SET description = $1 WHERE id = $2", [
          description,
          taskId,
        ]);
      }

      const newResult = await client.query(
        "SELECT * FROM tasks WHERE id = $1",
        [taskId]
      );

      const taskUpdated = newResult.rows[0];

      await client.query("COMMIT");

      return taskUpdated;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteTask(taskId: string) {
    const client = await pool.connect();

    try {
      const result = await client.query("SELECT * FROM tasks WHERE id = $1", [
        taskId,
      ]);

      if (!result.rows.length) {
        throw new Error(`Task ID: ${taskId} not found`);
      }

      await client.query("DELETE FROM tasks WHERE id = $1", [taskId]);

      return result.rows[0];
    } finally {
      client.release();
    }
  }

  async completeTask(taskId: string) {
    const client = await pool.connect();

    try {
      const result = await client.query("SELECT * FROM tasks WHERE id = $1", [
        taskId,
      ]);

      if (!result.rows.length) {
        throw new Error(`Task ID: ${taskId} not found`);
      }

      if (result.rows[0].completed) {
        throw new Error(`Task ID: ${taskId} is already completed`);
      }

      await client.query("UPDATE tasks SET completed = true WHERE id = $1", [
        taskId,
      ]);

      return { message: "Task has been completed" };
    } finally {
      client.release();
    }
  }
}

export default new TaskService();
