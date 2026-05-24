import {fetcher} from './client';
import {SleeperLeague, SleeperRoster, SleeperUser} from 'shared';

const user_id = process.env.SLEEPER_USER_ID;
if (!user_id) {
  throw new Error('Sleeper USER_ID not set in .env');
}

const league_id = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
if (!league_id) {
  throw new Error('Sleeper dynasty league id not set in env');
}

const userRes = await fetcher<SleeperUser>(`https://api.sleeper.app/v1/user/${user_id}`);

const leaguesRes = await fetcher<SleeperLeague[]>(
  `https://api.sleeper.app/v1/user/${user_id}/leagues/nfl/2026`
);

const dynastyRes = await fetcher<SleeperLeague>(`https://api.sleeper.app/v1/league/${league_id}`);

const rostersRes = await fetcher<SleeperRoster[]>(
  `https://api.sleeper.app/v1/league/${league_id}/rosters`
);

console.log(rostersRes);

export {};
