import express from 'express';

const app = express();
const port = 3000;

app.get('/api/health', (req, res) => {
  res.send({ok: true});
});

app.listen(port, () => {
  console.log(`The dynastic cycle app is listening on port ${port}`);
});
