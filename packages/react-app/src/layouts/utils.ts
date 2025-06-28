import { Space } from '@data/types';
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

export const sidebarSpaceSection = (
  spaces: Space[],
  onClick: () => void,
): SidebarItem => {
  return {
    type: 'group',
    header: {
      type: 'header',
      label: 'Spaces',
      icon: 'plus',
      onClick,
    },
    items: [
      ...spaces.map((space: Space) => ({
        emoji: space.emoji,
        label: space.title,
        to: '/spaces/' + space.slug,
      })),
    ],
  };
};
