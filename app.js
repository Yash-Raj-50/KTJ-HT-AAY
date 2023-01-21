require('dotenv').config();
const express = require('express');

const app = express();

app.use('/auth', require('./routes/auth'));
app.use('/competitions', require('./routes/compettition'));

app.get('/', async (req, res) => {
  return res.status(200).json({ msg: 'backend sucessfully connected' });
});

const port = process.env.BACKEND_PORT;
app.listen(8800, () => {
  console.log(`backend is listening on port http://localhost:${port}`);
});
