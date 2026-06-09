import Rosters from '@/components/Rosters';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/rosters')({
  component: Rosters,
});
