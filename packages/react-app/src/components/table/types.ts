import type { ReactNode } from "react";

import type { ContextMenuItem } from "../context-menu";

export interface TableBaseProps {
  children?: ReactNode;
}

export interface TableRowProps extends TableBaseProps {
  hoverable?: boolean;
  contextMenuItems?: ContextMenuItem[];
}
