const pool = require('../db');

exports.createTask = async (req, res) => {
  const { title, description, completed_at } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: 'Dados de entrada inválidos' });
  }
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (title, description, completed_at, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
      [title, description, completed_at]
    );
    return res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    return res.status(500).json({ message: 'Erro interno ao criar tarefa' });
  }
};

exports.getAllTasks = async (req, res) => {
  const { title, description, completed, page = 1, pageSize = 5 } = req.query;

  try {
    let query = 'SELECT * FROM tasks WHERE 1=1';
    const queryParams = [];

    if (title) {
      query += ` AND title ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${title}%`);
    }

    if (description) {
      query += ` AND description ILIKE $${queryParams.length + 1}`;
      queryParams.push(`%${description}%`);
    }

    if (completed !== undefined) {
      query += ` AND completed_at = $${queryParams.length + 1}`;
      queryParams.push(completed);
    }

    const offset = (page - 1) * pageSize;

    query += ` ORDER BY id DESC OFFSET $${queryParams.length + 1} LIMIT $${
      queryParams.length + 2
    }`;
    queryParams.push(offset, pageSize);

    const { rows } = await pool.query(query, queryParams);

    let totalCountQuery = 'SELECT COUNT(*) FROM tasks WHERE 1=1';
    const totalCountParams = [];

    if (title) {
      totalCountQuery += ` AND title ILIKE $${totalCountParams.length + 1}`;
      totalCountParams.push(`%${title}%`);
    }

    if (description) {
      totalCountQuery += ` AND description ILIKE $${
        totalCountParams.length + 1
      }`;
      totalCountParams.push(`%${description}%`);
    }

    if (completed !== undefined) {
      totalCountQuery += ` AND completed_at = $${totalCountParams.length + 1}`;
      totalCountParams.push(completed);
    }

    const totalCountResult = await pool.query(
      totalCountQuery,
      totalCountParams
    );

    const totalCount = parseInt(totalCountResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / pageSize);

    return res.status(200).json({
      tasks: rows,
      totalCount,
      totalPages,
    });
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
  const { title, description, completed_at } = req.body;
  if (!title || !description || typeof completed_at !== 'boolean') {
    return res.status(400).json({ message: 'Dados de entrada inválidos' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, completed_at = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, description, completed_at, id]
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

exports.updateCheckTask = async (req, res) => {
  const { id } = req.params;
  const { completed_at } = req.body;

  if (completed_at === undefined) {
    return res.status(400).json({ message: 'Dados de entrada inválidos' });
  }
  try {
    const { rows } = await pool.query(
      'UPDATE tasks SET completed_at = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [completed_at, id]
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
