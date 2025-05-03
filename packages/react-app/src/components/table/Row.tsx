import type { TableRowProps } from "./types";
import styles from "./index.module.css";

const Row = ({ children, hoverable }: TableRowProps) => {
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
