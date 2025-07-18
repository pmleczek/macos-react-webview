import type { NavigateFunction } from 'react-router';

import type { CommandItemWithKeywords } from '../types';

const commonKeywords = ['navigate', 'navigation', 'page', 'go to', 'open'];

export const getNavigationActions = (
  navigate: NavigateFunction,
): CommandItemWithKeywords[] => {
  return [
    {
      icon: 'home',
      label: 'Home',
      keywords: [...commonKeywords, 'home'],
      action: () => navigate('/'),
    },
    {
      icon: 'app_window',
      label: 'Application',
      keywords: [...commonKeywords, 'application'],
      action: () => navigate('/application'),
    },
    {
      icon: 'clipboard',
      label: 'Clipboard',
      keywords: [...commonKeywords, 'clipboard'],
      action: () => navigate('/clipboard'),
    },
    {
      icon: 'data',
      label: 'Data',
      keywords: [...commonKeywords, 'data', 'database'],
      action: () => navigate('/data'),
    },
    {
      icon: 'folder',
      label: 'File System',
      keywords: [...commonKeywords, 'filesystem', 'file', 'system'],
      action: () => navigate('/filesystem'),
    },
    {
      icon: 'bell',
      label: 'Notifications',
      keywords: [...commonKeywords, 'notifications'],
      action: () => navigate('/notifications'),
    },
  ];
};
