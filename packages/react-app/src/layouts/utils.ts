import { SidebarItem } from 'ui';

export const navigationLinks: SidebarItem[] = [
  {
    icon: 'home',
    label: 'Home',
    to: '/',
  },
  {
    icon: 'app_window',
    label: 'Application',
    to: '/application',
  },
  {
    icon: 'clipboard',
    label: 'Clipboard',
    to: '/clipboard',
  },
  {
    icon: 'folder',
    label: 'File System',
    to: '/filesystem',
  },
  {
    icon: 'bell',
    label: 'Notifications',
    to: '/notifications',
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
