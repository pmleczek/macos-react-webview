import type { ReactNode } from "react";

import type { ContextMenuItem } from "../context-menu";

export interface TableBaseProps {
  children?: ReactNode;
}

export interface TableProps extends TableBaseProps {
  checkboxes?: boolean;
}

export interface TableRowProps extends TableBaseProps {
  hoverable?: boolean;
  contextMenuItems?: ContextMenuItem[];
}

export interface TableCheckboxProps {
  checked?: boolean;
  onChange: (newValue: boolean) => void;
}

export type TableStateAtom =
  | {
      renderCheckboxes: boolean;
      selectedIndices: number[];
    }
  | undefined;
