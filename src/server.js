const express = require('express');
const routes = require('./routes');
const sqlConnection = require('./database/sqlite');
const app = express();

app.use(express.json());
sqlConnection();
app.use(routes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Processando em ${PORT}`);
});
