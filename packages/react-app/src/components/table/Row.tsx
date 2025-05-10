import cs from "classnames";
import { useAtom } from "jotai";

import { selectedRowAtom } from "./atoms";
import type { TableRowProps } from "./types";
import styles from "./index.module.css";
import ContextMenu from "../context-menu";

const Row = ({
  contextMenuItems,
  children,
  hoverable,
  index,
}: TableRowProps) => {
  const [selectedRow, setSelectedRow] = useAtom(selectedRowAtom);

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
        onContextMenu={() => setSelectedRow(index ?? -1)}
        onContextMenuHide={() => setSelectedRow(-1)}
      >
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
      {children}
    </tr>
  );
};

export default Row;
