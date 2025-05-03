import type { ReactNode } from "react";

export interface TableBaseProps {
  children?: ReactNode;
}

export interface TableRowProps extends TableBaseProps {
  hoverable?: boolean;
}
