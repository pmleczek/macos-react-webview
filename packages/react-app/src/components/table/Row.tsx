import type { TableBaseProps } from "./types";
import styles from "./index.module.css";

const Row = ({ children }: TableBaseProps) => {
  return <tr className={styles.table_row}>{children}</tr>;
};

export default Row;
