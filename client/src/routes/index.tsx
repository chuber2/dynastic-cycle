import HealthCheck from '@/components/HealthCheck';
import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HealthCheck,
});
