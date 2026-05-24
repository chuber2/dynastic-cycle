import {Router} from 'express';
import {refreshPlayerCacheIfStale} from '../sleeper/playerCache';

export const playersRouter = Router();

playersRouter.post('/refresh', async (req, res) => {
  const result = await refreshPlayerCacheIfStale();
  res.json(result);
});
