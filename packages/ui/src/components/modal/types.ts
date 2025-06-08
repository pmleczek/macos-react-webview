import type { ReactNode } from 'react';

export interface BaseModalProps {
  children?: ReactNode;
}

export interface ModalProps extends BaseModalProps {
  onHide?: () => void;
  show?: boolean;
}

export interface ModalCloseButtonProps {
  onHide?: () => void;
}

export interface ModalTitleProps {
  title: string;
  subtitle?: string;
}
