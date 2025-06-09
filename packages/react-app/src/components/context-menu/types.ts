import type { ElementType, ReactNode } from 'react';
import { IconName } from 'ui';

export interface ContextMenuProps {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  items: ContextMenuItem[];
  onContextMenu?: () => void;
  onContextMenuHide?: () => void;
}

export interface ContextMenuItem {
  icon?: IconName;
  label: string;
  handler?: (() => void) | (() => Promise<void>);
}

export interface ContextMenuProviderProps {
  children?: ReactNode;
}

export interface MenuProps {
  items: ContextMenuItem[];
}

export type ContextMenuAtom = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onHide?: () => void;
} | null;
