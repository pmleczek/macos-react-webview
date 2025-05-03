import type { TableBaseProps } from "./types";
import styles from "./index.module.css";

const Head = ({ children }: TableBaseProps) => {
  return <th className={styles.table_head}>{children}</th>;
};

export default Head;
