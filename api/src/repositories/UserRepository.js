const pool = require("../../database");

class UserRepository {
  async findByEmail(email) {
    try {
      const query = `
        SELECT *
        FROM users
        WHERE email = $1
      `;
      const { rows } = await pool.query(query, [email]);
      return rows[0];
    } catch (error) {
      throw new AppError("Internal server error", 500);
    }
  }

  async create({ name, email, password }) {
    try {
      const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const { rows } = await pool.query(query, [name, email, password]);
      return rows[0];
    } catch (error) {
      throw new AppError("Internal server error", 500);
    }
  }
};


module.exports = UserRepository;