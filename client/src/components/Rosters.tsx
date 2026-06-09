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
import {useQuery} from '@tanstack/react-query';
import {EnrichedRoster} from 'shared';

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
          <pre className="bg-muted p-4 rounded font-mono text-sm">
            {JSON.stringify(data[0].players[0].firstName, null, 2)}
          </pre>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.map((roster, index) => (
              <Card key={roster.roster_id}>
                <CardHeader>
                  <CardTitle>Roster {index + 1}</CardTitle>
                  <CardDescription>Managed by: {roster.owner_id}</CardDescription>
                  <CardContent>
                    <ul className="divide-y divide-border">
                      {roster.players.map((player) => (
                        <li key={player.id} className="flex items-center justify-between py-2">
                          <div>
                            <div className="font-medium">
                              {player.firstName} {player.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {player.position} {player.team ?? 'FA'}{' '}
                            </div>
                          </div>
                          <div className="text-sm tabular-nums">{player.age ?? '-'}</div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CardHeader>
              </Card>
            ))}
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
