require("express-async-errors");
require("dotenv/config");

const express = require("express");
const routes = require("./routes/index.js");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/AppError.js");
const tableModel = require('./model/tableModel.js');

const app = express();
app.use(express.json());
// app.use(cookieParser());
app.use(cors());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }
  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, async () => {
  try {
    const checkIfTableExists = await tableModel.checkTable();
    if (!checkIfTableExists) {
      await tableModel.createTable();
      console.log('Tabela criada.');
    } else {
      console.log('Tabela pronta.');
    }
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
  console.log(`Server running on port ${PORT}`);
});