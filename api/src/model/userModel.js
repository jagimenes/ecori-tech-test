const pool = require("../../database");

const AppError = require("../utils/AppError");


async function checkTable() {
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables
        WHERE  table_name = 'users'
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
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(query);
  } catch (error) {
    throw new AppError("Failed to create table:", error);
  }
}

module.exports = { checkTable, createTable };