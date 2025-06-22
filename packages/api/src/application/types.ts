export type Theme = 'dark' | 'light' | 'system';

export interface ThemeResponse {
  theme: Theme;
}

export interface SetThemeRequest {
  theme: Theme;
}
