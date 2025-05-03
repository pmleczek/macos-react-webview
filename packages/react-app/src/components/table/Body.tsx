import type { TableBaseProps } from "./types";
import styles from "./index.module.css";

const Body = ({ children }: TableBaseProps) => {
  return <tbody className={styles.table_body}>{children}</tbody>;
};

export default Body;
