import {SleeperLeague, SleeperRoster} from 'shared';
import {fetcher, SLEEPER_BASE_API} from './client';
import {prisma} from '../db';
import type {PlayerCache} from '../generated/prisma/client';

type EnrichedRoster = Omit<SleeperRoster, 'players'> & {
  players: PlayerCache[];
};

export const getLeagueDetails = async (): Promise<SleeperLeague> => {
  const leagueId = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
  if (!leagueId) {
    throw new Error('SLEEPER_DYNASTY_LEAGUE_ID not set in .env');
  }
  return fetcher<SleeperLeague>(`${SLEEPER_BASE_API}/league/${leagueId}`);
};

// helper to fetch the rosters in the league and enrich them from the PlayerCache.
export const getEnrichedRosters = async (): Promise<EnrichedRoster[]> => {
  const leagueId = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
  if (!leagueId) {
    throw new Error('SLEEPER_DYNASTY_LEAGUE_ID not set in .env');
  }
  const rawRosters = await fetcher<SleeperRoster[]>(
    `${SLEEPER_BASE_API}/league/${leagueId}/rosters`
  );

  const ids = rawRosters.flatMap((r) => r.players ?? []);
  const players = await prisma.playerCache.findMany({
    where: {id: {in: ids}},
  });

  const playerById = Object.fromEntries(players.map((p) => [p.id, p]));

  return rawRosters.map((r) => ({
    ...r,
    players: (r.players ?? [])
      .map((id) => playerById[id])
      .filter((p): p is PlayerCache => p != null),
  }));
};
