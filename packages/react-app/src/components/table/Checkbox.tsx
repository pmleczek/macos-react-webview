import type { TableCheckboxProps } from "./types";
import styles from "./index.module.css";

const Checkbox = ({ checked, onChange }: TableCheckboxProps) => {
  return (
    <input
      checked={checked}
      onChange={() => onChange(!checked)}
      className={styles.table_checkbox}
      type="checkbox"
    />
  );
};

export default Checkbox;
