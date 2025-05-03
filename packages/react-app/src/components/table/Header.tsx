import type { TableBaseProps } from "./types";
import styles from "./index.module.css";

const Header = ({ children }: TableBaseProps) => {
  return <thead className={styles.table_header}>{children}</thead>;
};

export default Header;
