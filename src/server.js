require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const sqlConnection = require('./database/sqlite');
const AppError = require('./utils/AppError');
const app = express();

app.use(express.json());
sqlConnection();
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusError).json({
      error: error.statusError,
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    error: 'Error',
    message: 'Internal error',
  });
});

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Processando em ${PORT}`);
});
