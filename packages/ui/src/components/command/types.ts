import type { ReactNode } from 'react';

import type { IconName } from '../icon';

export interface CommandProps {
  children?: ReactNode;
  onHide: () => void;
  show: boolean;
}

export interface CommandInputProps {
  onChange?: (newValue: string) => void;
  onHide?: () => void;
  value: string;
}

export interface CommandBodyProps {
  children?: ReactNode;
}

export interface CommandHeaderProps {
  label: string;
}

export interface CommandEmptyProps {
  message?: string;
}

export interface CommandItem {
  action: () => void;
  icon?: IconName;
  label: string;
}

export interface CommandItemProps {
  index?: number;
  item: CommandItem;
  focused?: boolean;
}

export interface CommandStateAtom {
  hide: () => void;
  selectedIndex: number;
}

export type CommandStateAtomType = CommandStateAtom | null;
