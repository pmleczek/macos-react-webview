import type { ReactNode } from 'react';

export interface MenuBarProps {
  breadcrumbs?: ReactNode;
  onToggleSidebar?: () => void;
  sideBarHidden?: boolean;
  sideBarToggle?: boolean;
}

export interface SidebarToggleProps {
  onToggle?: () => void;
}
