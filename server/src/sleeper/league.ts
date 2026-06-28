import {EnrichedRoster, SleeperLeague, SleeperLeagueUser, SleeperRoster} from 'shared';
import {fetcher, SLEEPER_BASE_API} from './client';
import {prisma} from '../db';
import type {PlayerCache} from '../generated/prisma/client';

export const getLeagueDetails = async (): Promise<SleeperLeague> => {
  const leagueId = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
  if (!leagueId) {
    throw new Error('SLEEPER_DYNASTY_LEAGUE_ID not set in .env');
  }
  return fetcher<SleeperLeague>(`${SLEEPER_BASE_API}/league/${leagueId}`);
};

export const getLeagueUsers = async (): Promise<SleeperLeagueUser[]> => {
  const leagueId = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
  if (!leagueId) {
    throw new Error('SLEEPER_DYNASTY_LEAGUE_ID not set in .env');
  }
  return fetcher<SleeperLeagueUser[]>(`${SLEEPER_BASE_API}/league/${leagueId}/users`);
};

// helper to fetch the rosters in the league and enrich them from the PlayerCache.
export const getEnrichedRosters = async (): Promise<EnrichedRoster[]> => {
  const leagueId = process.env.SLEEPER_DYNASTY_LEAGUE_ID;
  if (!leagueId) {
    throw new Error('SLEEPER_DYNASTY_LEAGUE_ID not set in .env');
  }

  const [rawRosters, rawLeagueUsers] = await Promise.all([
    fetcher<SleeperRoster[]>(`${SLEEPER_BASE_API}/league/${leagueId}/rosters`),
    getLeagueUsers(),
  ]);

  const usersById: Map<string, SleeperLeagueUser> = new Map(
    rawLeagueUsers.map((user) => [user.user_id, user])
  );

  const ids = rawRosters.flatMap((r) => r.players ?? []);
  const players = await prisma.playerCache.findMany({
    where: {id: {in: ids}},
  });

  const playerById = Object.fromEntries(players.map((p) => [p.id, p]));

  return rawRosters.map((r) => ({
    ...r,
    owner: usersById.get(r.owner_id) ?? null, // normalize the type. map.get() returns undefined sometimes.
    players: (r.players ?? [])
      .map((id) => playerById[id])
      .filter((p): p is PlayerCache => p != null),
  }));
};
