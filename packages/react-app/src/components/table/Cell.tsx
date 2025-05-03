import type { TableBaseProps } from "./types";
import styles from "./index.module.css";

const Cell = ({ children }: TableBaseProps) => {
  return <td className={styles.table_cell}>{children}</td>;
};

export default Cell;
