import {Button} from '@/components/ui/button';
import {useQuery} from '@tanstack/react-query';

const HealthCheck = () => {
  const {data, isLoading, error, refetch, isFetching} = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await fetch('/api/health');
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
        <pre className="bg-muted p-4 rounded font-mono text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <Button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? 'Fetching...' : 'Refetch da Data'}
      </Button>
    </>
  );
};

export default HealthCheck;
