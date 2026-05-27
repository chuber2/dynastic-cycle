import {Router} from 'express';
import {getEnrichedRosters, getLeagueDetails} from '../sleeper/league';

export const leaguesRouter = Router();

leaguesRouter.get('/', async (req, res) => {
  const result = await getLeagueDetails();
  res.json(result);
});

leaguesRouter.get('/rosters', async (req, res) => {
  const result = await getEnrichedRosters();
  res.json(result);
});
