import { useCallback } from "react";
import { useAtom } from "jotai";

import { selectedRowsAtom } from "./atoms";
import type { TableCheckboxProps } from "./types";
import styles from "./index.module.css";

const Checkbox = ({ dataCount, index }: TableCheckboxProps) => {
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom);

  const isHeaderCheckbox = index === undefined;
  const checked = isHeaderCheckbox
    ? selectedRows.size > 0
    : selectedRows.has(index);

  const handleChange = useCallback(() => {
    if (isHeaderCheckbox) {
      setSelectedRows((prev) => {
        const newSet = new Set<number>(prev);
        if (newSet.size === dataCount) {
          newSet.clear();
        } else {
          for (let i = 0; i < (dataCount ?? 0); i++) {
            newSet.add(i);
          }
        }
        return newSet;
      });
    } else {
      setSelectedRows((prev) => {
        const newSet = new Set<number>(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    }
  }, [dataCount, index, isHeaderCheckbox, setSelectedRows]);

  return (
    <input
      checked={checked}
      onChange={handleChange}
      className={styles.table_checkbox}
      type="checkbox"
    />
  );
};

export default Checkbox;
