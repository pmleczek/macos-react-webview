import { emitTwoWayEvent } from 'ipc';

import { ApplicationEvent } from '../events';
import type { SetThemeRequest, Theme, ThemeResponse } from './types';

export const getThemeAsync = async () => {
  const response = await emitTwoWayEvent<undefined, ThemeResponse>(
    ApplicationEvent.GetTheme,
  );
  return response.theme;
};

export const setThemeAsync = async (theme: Theme) => {
  const response = await emitTwoWayEvent<SetThemeRequest, ThemeResponse>(
    ApplicationEvent.SetTheme,
    {
      theme,
    },
  );

  if (theme === 'system') {
    const darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('dark', String(darkTheme));
  } else {
    document.documentElement.setAttribute('dark', String(theme === 'dark'));
  }

  return response.theme;
};
