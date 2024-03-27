const pool = require("../../database");

const AppError = require("../utils/AppError");

class TaskController {
  async create(request, response) {
    const { title, description } = request.body;
    const user_id = request.user.id;

    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
      return response.status().json();
    }

    try {
      const { rows } = await pool.query(
        'INSERT INTO tasks (title, description, user_id, completed_at, created_at) VALUES ($1, $2, $3, false, NOW()) RETURNING *',
        [title, description, user_id]
      );
      return response.status(201).json(rows[0]);
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };

  async index(request, response) {
    const user_id = request.user.id;

    const { search, page = 1, pageSize = 2 } = request.query;
    const offset = (page - 1) * pageSize;
    try {
      let query = `
        SELECT *
        FROM tasks
        ${search ? `WHERE user_id = ${user_id} AND (title ILIKE '%${search}%' OR description ILIKE '%${search}%')` : `WHERE user_id = ${user_id}`}
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
      const { rows } = await pool.query(query);

      const countQuery = `
        SELECT COUNT(*) as total
        FROM tasks
        ${search ? `WHERE user_id = ${user_id} AND title ILIKE '%${search}%' OR description ILIKE '%${search}%'` : `WHERE user_id = ${user_id}`}
      `;
      const { rows: countRows } = await pool.query(countQuery);
      const totalCount = countRows[0].total;

      return response.json({ data: rows, totalCount });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  };

  async show(request, response) {
    const { id } = request.params;
    try {
      const query = `
        SELECT *
        FROM tasks
        WHERE id = $1
      `;
      const { rows } = await pool.query(query, [id]);
      return response.json(rows[0]);
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };

  async update(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;
    const { title, description } = request.body;

    const queryCheckToIfIsUserTask = `
        SELECT EXISTS (
          SELECT 1
          FROM   tasks
          WHERE  id = $1 AND user_id = ${user_id}
        ) AS user_task
      `;

    const result = await pool.query(queryCheckToIfIsUserTask, [id]);
    const checkIfIsUserTask = result.rows[0].user_task;

    if (!checkIfIsUserTask) {
      throw new AppError("Apparently this task don't belong to this user!", 403);
    }

    try {
      const query = `
        UPDATE tasks
        SET title = $1, description = $2, updated_at = NOW()
        WHERE id = $3 AND user_id = ${user_id}
        RETURNING *
      `;
      const { rows } = await pool.query(query, [title, description, id]);
      return response.json(rows[0]);
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const queryCheckToIfIsUserTask = `
        SELECT EXISTS (
          SELECT 1
          FROM   tasks
          WHERE  id = $1 AND user_id = ${user_id}
        ) AS user_task
      `;

    const result = await pool.query(queryCheckToIfIsUserTask, [id]);
    const checkIfIsUserTask = result.rows[0].user_task;

    if (!checkIfIsUserTask) {
      throw new AppError("Apparently this task don't belong to this user!", 403);
    }

    try {
      const query = `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = ${user_id}
      `;
      await pool.query(query, [id]);
      return response.status(204).send();
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };

  async toggleComplete(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const queryCheckToIfIsUserTask = `
        SELECT EXISTS (
          SELECT 1
          FROM   tasks
          WHERE  id = $1 AND user_id = ${user_id}
        ) AS user_task
      `;

    const result = await pool.query(queryCheckToIfIsUserTask, [id]);
    const checkIfIsUserTask = result.rows[0].user_task;

    if (!checkIfIsUserTask) {
      throw new AppError("Apparently this task don't belong to this user!", 403);
    }

    try {
      const query = `
        UPDATE tasks
        SET completed_at = NOT completed_at, updated_at = NOW()
        WHERE id = $1
        RETURNING *
      `;
      const { rows } = await pool.query(query, [id]);
      return response.json(rows[0]);
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };
};


module.exports = TaskController;