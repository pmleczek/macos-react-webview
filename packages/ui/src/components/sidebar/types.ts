import type { To } from 'react-router';

import type { IconName } from '../icon';

export interface SidebarItem {
  icon?: IconName;
  label: string;
  to: To;
}

export interface SidebarProps {
  items: SidebarItem[];
}

export interface SidebarItemProps {
  icon?: IconName;
  label: string;
  to: To;
}
