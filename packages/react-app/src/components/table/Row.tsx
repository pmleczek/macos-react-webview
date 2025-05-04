import type { TableRowProps } from "./types";
import styles from "./index.module.css";
import ContextMenu from "../context-menu";

const Row = ({ contextMenuItems, children, hoverable }: TableRowProps) => {
  if (contextMenuItems) {
    return (
      <ContextMenu
        as="tr"
        items={contextMenuItems}
        className={`${styles.table_row} ${
          hoverable ? styles.table_row_hoverable : ""
        }`}
      >
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
      {children}
    </tr>
  );
};

export default Row;
