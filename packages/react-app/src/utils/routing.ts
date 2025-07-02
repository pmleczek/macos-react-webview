import { SidebarLayout } from '@layouts';
import {
  Application,
  Clipboard,
  FileSystem,
  Home,
  Notifications,
  Settings,
  Space,
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
      {
        path: '/spaces/:slug',
        Component: Space,
      },
    ],
  },
]);

export default rootRouter;
