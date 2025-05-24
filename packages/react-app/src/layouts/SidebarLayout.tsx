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
