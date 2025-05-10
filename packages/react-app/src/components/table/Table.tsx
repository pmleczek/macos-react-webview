
import type { Column, TableContextMenuItem, TableProps } from "./types";
import Cell from "./Cell";
import Checkbox from "./Checkbox";
import Row from "./Row";
import styles from "./index.module.css";

const Table = <T,>(props: TableProps<T>) => {
  const {
    checkboxes,
    columns,
    contextMenuItems,
    data,
    disableHovering,
    keyExtractor,
    renderRow,
  } = props;

  return (
    <table className={styles.table}>
      {/* Table header */}
      <thead className={styles.table_header}>
        <Row>
          {checkboxes && (
            <td className={styles.table_cell_checkbox}>
              <Checkbox dataCount={data.length} />
            </td>
          )}
          {columns.map((column: Column<T>) => {
            const isObject = typeof column !== "string";
            return (
              <th
                key={isObject ? column.key : column}
                className={styles.table_head}
              >
                {isObject ? column.label : column}
              </th>
            );
          })}
        </Row>
      </thead>
      {/* Table body */}
      <tbody className={styles.table_body}>
        {data.map((item: T, index: number) => (
          <Row
            contextMenuItems={
              contextMenuItems &&
              contextMenuItems.map((menuItem: TableContextMenuItem<T>) => ({
                icon: menuItem.icon,
                label: menuItem.label,
                handler: () => menuItem.onSelect(item, index),
              }))
            }
            hoverable={!disableHovering}
            index={index}
            key={keyExtractor(item, index)}
          >
            {checkboxes && (
              <td className={styles.table_cell_checkbox}>
                <Checkbox index={index} />
              </td>
            )}
            {renderRow(item, index)}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

Table.Cell = Cell;

export default Table;
