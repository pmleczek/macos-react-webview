import { useAtomValue } from "jotai";

import { tableStateAtom } from "./atoms";
import type { TableRowProps } from "./types";
import Checkbox from "./Checkbox";
import styles from "./index.module.css";
import ContextMenu from "../context-menu";

const Row = ({ contextMenuItems, children, hoverable }: TableRowProps) => {
  const tableState = useAtomValue(tableStateAtom);

  if (contextMenuItems) {
    return (
      <ContextMenu
        as="tr"
        items={contextMenuItems}
        className={`${styles.table_row} ${
          hoverable ? styles.table_row_hoverable : ""
        }`}
      >
        {tableState?.renderCheckboxes && (
          <td className={styles.table_cell_checkbox}>
            <Checkbox />
          </td>
        )}
        {children}
      </ContextMenu>
    );
  }

  return (
    <tr
      className={`${styles.table_row} ${
        hoverable ? styles.table_row_hoverable : ""
      }`}
    >
      {tableState?.renderCheckboxes && (
        <td className={styles.table_cell_checkbox}>
          <Checkbox />
        </td>
      )}
      {children}
    </tr>
  );
};

export default Row;
