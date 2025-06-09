import { Space } from '@data/types';
import { SidebarItem } from 'ui';

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
