import {SleeperPlayersMap, SleeperPlayerDetails} from 'shared';
import {fetcher, SLEEPER_PLAYERS_API} from './client';
import {prisma} from '../db';
import type {Prisma} from '../generated/prisma/client';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

type RefreshResult =
  | {status: 'refreshed'; refreshedAt: Date; playerCount: number}
  | {status: 'skipped'; lastRefreshedAt: Date};

const toCacheRow = (p: SleeperPlayerDetails): Prisma.PlayerCacheCreateManyInput => {
  return {
    id: p.player_id,
    firstName: p.first_name,
    lastName: p.last_name,
    fullName: p.full_name,
    position: p.position,
    team: p.team,
    age: p.age,
    birthDate: p.birth_date,
    status: p.status,
    // fetchedAt filled automatically.
  };
};

export const refreshPlayerCacheIfStale = async (): Promise<RefreshResult> => {
  // Read CacheMeta
  const mostRecentCacheRefresh = await prisma.cacheMeta.findUnique({
    where: {key: 'players_nfl'},
  });

  // check if the cache is more than 1 day stale (ir if there's no existing cache)
  const isCacheStale =
    mostRecentCacheRefresh === null ||
    Date.now() - mostRecentCacheRefresh.refreshedAt.getTime() > ONE_DAY_MS;

  if (!isCacheStale) {
    return {status: 'skipped', lastRefreshedAt: mostRecentCacheRefresh.refreshedAt};
  }

  // If stale, call the sleepers player endpoint and refresh the cache.
  const now = new Date();
  const players = await fetcher<SleeperPlayersMap>(SLEEPER_PLAYERS_API);
  await prisma.$transaction([
    prisma.playerCache.deleteMany({}),
    prisma.playerCache.createMany({data: Object.values(players).map((p) => toCacheRow(p))}),
    // and update the CacheMeta table so we know the cache was refreshed.
    prisma.cacheMeta.upsert({
      where: {key: 'players_nfl'},
      update: {refreshedAt: now},
      create: {
        key: 'players_nfl',
        refreshedAt: now,
      },
    }),
  ]);
  return {status: 'refreshed', refreshedAt: now, playerCount: Object.values(players).length};
};
