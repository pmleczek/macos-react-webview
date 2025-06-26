import 'ui/dist/index.css';

import { Menu } from '@components/context-menu';
import { queryClient } from '@data';
import {
  Application,
  Clipboard,
  Home,
  Notifications,
  Settings,
  Space,
} from '@pages';
import { QueryClientProvider } from '@tanstack/react-query';
import { ipcHandler, IPCHandlerProvider } from 'ipc';
import { createHashRouter, RouterProvider } from 'react-router';

const router = createHashRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/application',
    Component: Application,
  },
  {
    path: '/clipboard',
    Component: Clipboard,
  },
  {
    path: '/notifications',
    Component: Notifications,
  },
  {
    path: '/settings',
    Component: Settings,
  },
  {
    path: '/spaces/:slug',
    Component: Space,
  },
]);

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
