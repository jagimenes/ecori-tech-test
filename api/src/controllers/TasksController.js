const pool = require("../../database");

const AppError = require("../utils/AppError");

class TaskController {
  async create(request, response) {
    const { title, description } = request.body;

    if (!title || !description) {
      throw new AppError("Title and description are required", 400);
      return response.status().json();
    }

    try {
      const { rows } = await pool.query(
        'INSERT INTO tasks (title, description, completed_at, created_at) VALUES ($1, $2, false, NOW()) RETURNING *',
        [title, description]
      );
      return response.status(201).json(rows[0]);
    } catch (error) {
      throw new AppError("Internal server error", 500);
      return response.status().json();
    }
  };

  async index(request, response) {
    const { search, page = 1, pageSize = 2 } = request.query;
    const offset = (page - 1) * pageSize;
    try {
      let query = `
        SELECT *
        FROM tasks
        ${search ? `WHERE title ILIKE '%${search}%' OR description ILIKE '%${search}%'` : ''}
        LIMIT ${pageSize}
        OFFSET ${offset}
      `;
      const { rows } = await pool.query(query);

      const countQuery = `
        SELECT COUNT(*) as total
        FROM tasks
        ${search ? `WHERE title ILIKE '%${search}%' OR description ILIKE '%${search}%'` : ''}
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
    const { title, description } = request.body;
    try {
      const query = `
        UPDATE tasks
        SET title = $1, description = $2, updated_at = NOW()
        WHERE id = $3
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
    try {
      const query = `
        DELETE FROM tasks
        WHERE id = $1
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