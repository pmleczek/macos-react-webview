import { createHashRouter, RouterProvider } from 'react-router';
import 'ui/dist/index.css';

import { Menu } from '@components/context-menu';
import { Home, Settings, Space, Table } from '@pages';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createHashRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/table',
    Component: Table,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '/spaces/:id',
    Component: Space,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Menu />
    </QueryClientProvider>
  );
};

export default App;
