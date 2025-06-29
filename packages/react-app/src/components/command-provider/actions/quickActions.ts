import { application } from 'api';
import type { NavigateFunction } from 'react-router';

import type { CommandItemWithKeywords } from '../types';

const staticItems: CommandItemWithKeywords[] = [
  // Switch color theme
  {
    icon: 'sun',
    label: 'Switch color theme',
    keywords: ['theme', 'dark mode', 'dark', 'light mode', 'light'],
    action: () => {
      const darkAttrValue = document.documentElement.getAttribute('dark');
      const hasDarkTheme = !!darkAttrValue && darkAttrValue === 'true';
      application.setThemeAsync(hasDarkTheme ? 'light' : 'dark');
    },
  },
  // Use system color theme
  {
    icon: 'monitor_cog',
    label: 'Use system color theme',
    keywords: [
      'theme',
      'dark mode',
      'dark',
      'light mode',
      'light',
      'system theme',
    ],
    action: () => {
      const darkAttrValue = document.documentElement.getAttribute('dark');
      const hasDarkTheme = !!darkAttrValue && darkAttrValue === 'true';
      application.setThemeAsync(hasDarkTheme ? 'light' : 'dark');
    },
  },
];

export const getQuickActionsItems = (
  navigate: NavigateFunction,
): CommandItemWithKeywords[] => {
  return [
    ...staticItems,
    // Navigate to settings
    {
      icon: 'settings',
      label: 'Open settings',
      keywords: [
        'settings',
        'navigate',
        'navigation',
        'go to',
        'open',
        'preferences',
        'adjustments',
      ],
      action: () => navigate('/settings'),
    },
  ];
};
