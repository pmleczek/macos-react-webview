import type { To } from 'react-router';

import type { IconName } from '../icon';

interface SidebarHeader {
  type: 'header';
  label: string;
  icon?: IconName;
  onClick?: () => void;
}

interface SidebarGroup {
  type: 'group';
  header: SidebarHeader;
  items: SidebarLink[];
}

interface SidebarLink {
  type?: undefined;
  icon?: IconName;
  emoji?: string;
  label: string;
  to: To;
}

export type SidebarItem = SidebarHeader | SidebarGroup | SidebarLink;

export interface SidebarProps {
  items: SidebarItem[];
  onToggleSearch?: () => void;
  search?: boolean;
}

export interface SidebarLinkProps {
  emoji?: string;
  icon?: IconName;
  label: string;
  to: To;
}

export interface SidebarHeaderProps {
  label: string;
  icon?: IconName;
  onClick?: () => void;
}

export interface SidebarSearchProps {
  onClick?: () => void;
}
