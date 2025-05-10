import type { ReactNode } from "react";

import type { ContextMenuItem } from "../context-menu";

export interface TableCellProps {
  children?: ReactNode;
}

export interface ColumnObject<T> {
  key: Extract<keyof T, string>;
  label: string;
}

export type Column<T> = ColumnObject<T> | Extract<keyof T, string>;

export type TableContextMenuItem<T> = Omit<ContextMenuItem, "handler"> & {
  onSelect: (item: T, index: number) => void;
};

export interface TableProps<T> {
  checkboxes?: boolean;
  columns: Array<Column<T>>;
  contextMenuItems?: Array<TableContextMenuItem<T>>;
  data: Array<T>;
  disableHovering?: boolean;
  keyExtractor: (item: T, index: number) => string;
  renderRow: (item: T, index: number) => ReactNode;
}

export interface TableRowProps {
  children?: ReactNode;
  contextMenuItems?: ContextMenuItem[];
  hoverable?: boolean;
  index?: number;
}

export interface TableCheckboxProps {
  dataCount?: number;
  index?: number;
}
