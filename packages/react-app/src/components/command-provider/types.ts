import type { CommandItem } from 'ui';

export interface CommandItems {
  empty: boolean;
  loading: boolean;
  quickActions: CommandItem[];
  navigation: CommandItem[];
}

export interface CommandItemWithKeywords extends CommandItem {
  keywords: string[];
}
