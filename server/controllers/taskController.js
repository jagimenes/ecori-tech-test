const pool = require('../db');

exports.createTask = async (req, res) => {
  const { title, description, completed } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Dados de entrada inválidos' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, completed_at, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, description, completed]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    return res.status(500).json({ message: 'Erro interno ao criar tarefa' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return res.status(200).send(rows);
  } catch (err) {
    console.error('Erro ao obter todas as tarefas:', err);
    return res
      .status(500)
      .json({ message: 'Erro interno ao obter todas as tarefas' });
  }
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erro ao obter tarefa por ID:', err);
    return res
      .status(500)
      .json({ message: 'Erro interno ao obter tarefa por ID' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  if (!title || !description || typeof completed !== 'boolean') {
    return res.status(400).json({ message: 'Dados de entrada inválidos' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed_at = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, description, completed, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    return res
      .status(500)
      .json({ message: 'Erro interno ao atualizar tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1', [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('Erro ao excluir tarefa:', err);
    return res.status(500).json({ message: 'Erro interno ao excluir tarefa' });
  }
};

/* 
create task
    "title": "Dormir",
    "description": "Descansar para o próximo dia",
    "completed": false,
*/
