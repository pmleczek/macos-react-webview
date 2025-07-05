import { SidebarLayout } from '@layouts';
import {
  Application,
  Clipboard,
  Data,
  FileSystem,
  Home,
  Notifications,
  Settings,
} from '@pages';
import { createHashRouter } from 'react-router';

const rootRouter = createHashRouter([
  {
    Component: SidebarLayout,
    children: [
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
        path: '/data',
        Component: Data,
      },
      {
        path: '/filesystem',
        Component: FileSystem,
      },
      {
        path: '/notifications',
        Component: Notifications,
      },
      {
        path: '/settings',
        Component: Settings,
      },
    ],
  },
]);

export default rootRouter;
