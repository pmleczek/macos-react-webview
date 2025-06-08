import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IPCHandlerProvider } from 'ipc';
import 'ui/dist/index.css';
import { createHashRouter, RouterProvider } from 'react-router';

import { Menu } from '@components/context-menu';
import { ipcHandler } from '@data';
import { Home, Settings, Space, Table } from '@pages';

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
    <IPCHandlerProvider ipcHandler={ipcHandler}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Menu />
      </QueryClientProvider>
    </IPCHandlerProvider>
  );
};

export default App;
