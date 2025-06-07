import { Sidebar, SidebarItem } from 'ui';

import type { LayoutProps } from './types';

const items: SidebarItem[] = [
  {
    icon: 'home',
    label: 'Home',
    to: '/',
  },
  {
    icon: 'table',
    label: 'Table',
    to: '/table',
  },
  {
    icon: 'settings',
    label: 'Settings',
    to: '/settings',
  },
  {
    type: 'header',
    label: 'Favorites',
  },
  {
    type: 'group',
    header: {
      type: 'header',
      label: 'Spaces',
      icon: 'plus',
      onClick: () => console.log('Create new space'),
    },
    items: [
      {
        emoji: '🌎',
        label: 'Default',
        to: '/spaces/default',
      },
    ],
  },
];

const SidebarLayout = ({ children }: LayoutProps) => {
  return (
    <div className="sidebar-layout-container">
      <Sidebar items={items} />
      <div className="sidebar-layout-content-container">{children}</div>
    </div>
  );
};

export default SidebarLayout;
