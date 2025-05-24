import type { To } from 'react-router';

import type { IconName } from '../icon';

interface SidebarHeader {
  type: 'header';
  label: string;
}

interface SidebarLink {
  type?: undefined;
  icon?: IconName;
  label: string;
  to: To;
}

export type SidebarItem = SidebarHeader | SidebarLink;

export interface SidebarProps {
  items: SidebarItem[];
}

export interface SidebarLinkProps {
  icon?: IconName;
  label: string;
  to: To;
}

export interface SidebarHeaderProps {
  label: string;
}
