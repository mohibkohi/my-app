const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
  user: 'Main',
  password: '123#Welcome',
  server: 'studentdbmo.database.windows.net',
  database: 'StudentDB',
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

app.get('/users', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT Id, FirstName, LastName FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(4000, () => console.log('API running on port 4000'));