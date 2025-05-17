import type { ReactNode } from "react";

export interface ModalProps {
  blur?: boolean;
  children?: ReactNode;
  onHide: () => void;
  show: boolean;
}

export interface ModalContainerProps {
  children?: ReactNode;
  className?: string;
}
