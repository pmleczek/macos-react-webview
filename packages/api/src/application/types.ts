export type Theme = 'dark' | 'light' | 'system';

export interface ThemeResponse {
  theme: Theme;
}

export interface SetThemeRequest {
  theme: Theme;
}

export type PropertyKey =
  | 'bundleIdentifier'
  | 'appName'
  | 'appVersion'
  | 'buildNumber';

export interface GetPropertyRequest {
  key: PropertyKey;
}

export interface GetPropertyResponse {
  value: string;
}
