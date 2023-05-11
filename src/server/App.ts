import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env);
const express = require('express');
const app = express();
const port = process.env.API_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
