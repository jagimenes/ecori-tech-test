const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');

const tasksModel = require('./model/taskModel.js');
const taskRouter = require('./routes/taskRouter.js');

app.use(cors());
app.use(express.json());

app.use('/api/v1', taskRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    const tableExists = await tasksModel.checkTasksTable();
    if (!tableExists) {
      await tasksModel.createTasksTable();
      console.log('Tabela tasks criada com sucesso.');
    } else {
      console.log('A tabela tasks já existe.');
    }
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
  console.log(`Server running on port ${PORT}`);
});
