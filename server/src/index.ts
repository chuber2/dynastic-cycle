import express from 'express';
import {playersRouter} from './routes/players';

const app = express();
const port = 3000;

app.get('/api/health', (req, res) => {
  res.send({ok: true});
});

app.use('/api/players', playersRouter);

app.listen(port, () => {
  console.log(`The dynastic cycle app is listening on port ${port}`);
});
