import type { TableCellProps } from "./types";
import styles from "./index.module.css";

const Cell = ({ children }: TableCellProps) => {
  return <td className={styles.table_cell}>{children}</td>;
};

export default Cell;
