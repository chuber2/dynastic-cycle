import {Outlet, createRootRoute} from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen p-6 sm:p-8">
      <Outlet />
    </div>
  ),
});
