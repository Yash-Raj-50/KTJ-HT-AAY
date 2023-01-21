const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'sucessfully connected' });
});

app.listen(8800, () => {
  console.log(`backend is listening on port http://localhost:8800`);
});
