import type { To } from 'react-router';

export interface SidebarItem {
  label: string;
  to: To;
}

export interface SidebarProps {
  items: SidebarItem[];
}

export interface SidebarItemProps {
  label: string;
  to: To;
}
