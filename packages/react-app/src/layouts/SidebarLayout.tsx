import { Sidebar, SidebarItem } from 'ui';

import type { LayoutProps } from './types';

const items: SidebarItem[] = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Table',
    to: '/table',
  },
  {
    label: 'Settings',
    to: '/settings',
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
