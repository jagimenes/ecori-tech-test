const pool = require('../db');

async function checkTasksTable() {
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
  } catch (err) {
    console.error('Erro ao verificar a existência da tabela tasks:', err);
    throw err;
  }
}

async function createTasksTable() {
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
  } catch (err) {
    console.error('Erro ao criar tabela tasks:', err);
    throw err;
  }
}

module.exports = { checkTasksTable, createTasksTable };
