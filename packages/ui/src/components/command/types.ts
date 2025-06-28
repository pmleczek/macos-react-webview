import type { ReactNode } from 'react';

export interface CommandProps {
  children?: ReactNode;
  onHide?: () => void;
  show?: boolean;
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
