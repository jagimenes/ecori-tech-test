const pool = require("../../database");

const AppError = require("../utils/AppError");


async function checkTable() {
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables
        WHERE  table_name = 'tasks'
      ) AS table_exists
    `;

    const result = await pool.query(query);
    const tableExists = result.rows[0].table_exists;

    return tableExists;
  } catch (error) {
    throw new AppError("Failed to check table:", error);
  }
}

async function createTable() {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed_at BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
      )
    `;
    await pool.query(query);
  } catch (error) {
    throw new AppError("Failed to create table:", error);
  }
}

module.exports = { checkTable, createTable };