import cs from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { tableSelectedRowAtom, tableStateAtom } from "./atoms";
import type { TableRowProps } from "./types";
import Checkbox from "./Checkbox";
import styles from "./index.module.css";
import ContextMenu from "../context-menu";

const Row = ({
  contextMenuItems,
  children,
  hoverable,
  index,
}: TableRowProps) => {
  const tableState = useAtomValue(tableStateAtom);
  const [selectedRow, setSelectedRow] = useAtom(tableSelectedRowAtom);

  const isHoverable = hoverable && selectedRow == -1;

  if (contextMenuItems) {
    return (
      <ContextMenu
        as="tr"
        items={contextMenuItems}
        className={cs(
          styles.table_row,
          isHoverable && styles.table_row_hoverable,
          selectedRow === index && styles.selected
        )}
        onContextMenu={() => setSelectedRow(index)}
        onContextMenuHide={() => setSelectedRow(-1)}
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
        isHoverable ? styles.table_row_hoverable : ""
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
