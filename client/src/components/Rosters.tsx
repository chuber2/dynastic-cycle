import {Button} from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {POSITION_BORDER} from '@/lib/positionClasses';
import {TEAM_BG} from '@/lib/teamClasses';
import {useQuery} from '@tanstack/react-query';
import {EnrichedPlayer, EnrichedRoster} from 'shared';

const POSITION_ORDER = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'] as const;

const groupByPosition = (
  players: EnrichedRoster['players']
): Partial<Record<string, EnrichedPlayer[]>> => {
  return Object.groupBy(players, ({position}) => position ?? '-');
};

const Rosters = () => {
  const {data, isLoading, error, refetch, isFetching} = useQuery({
    queryKey: ['rosters'],
    queryFn: async (): Promise<EnrichedRoster[]> => {
      const response = await fetch('/api/league/rosters');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    },
  });

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div className="bg-red-900 text-red-200">Error: {error.message}</div>}
      {data && (
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.map((roster, index) => {
              const grouped = groupByPosition(roster.players);
              return (
                <Card key={roster.roster_id}>
                  <CardHeader>
                    <CardTitle>
                      {roster.owner?.metadata?.team_name ?? `Roster ${index + 1}`}
                    </CardTitle>{' '}
                    <CardDescription>Managed by: {roster.owner?.display_name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {POSITION_ORDER.map((pos) => {
                      const players = grouped[pos] ?? [];
                      if (players.length === 0) return null;
                      return (
                        <div key={pos}>
                          <h3>{pos}</h3>
                          <ul className="divide-y divide-border">
                            {players.map((player) => {
                              return (
                                <li
                                  key={player.id}
                                  className={`flex items-center justify-between py-2 border-l-4 ${POSITION_BORDER[player.position ?? ''] ?? 'border-zinc-600'}`}
                                >
                                  <div>
                                    <div className="font-medium">
                                      {player.firstName} {player.lastName}
                                    </div>
                                    <div className="flex flex-row gap-1 text-xs text-w-foreground">
                                      <div className={``}>{player.position}</div>
                                      <div>{player.team ?? 'FA'}</div>
                                    </div>
                                  </div>
                                  <div className="text-sm tabular-nums">{player.age ?? '-'}</div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      <Button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Fetching...' : 'Refetch da Data'}
      </Button>
    </>
  );
};

export default Rosters;
