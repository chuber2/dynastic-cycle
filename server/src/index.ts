import express from 'express';
import {playersRouter} from './routes/players';
import {leaguesRouter} from './routes/leagues';

const app = express();
const port = 3000;

app.get('/api/health', (req, res) => {
  res.send({ok: true});
});

app.use('/api/players', playersRouter);
app.use('/api/league', leaguesRouter);

app.listen(port, () => {
  console.log(`The dynastic cycle app is listening on port ${port}`);
});
