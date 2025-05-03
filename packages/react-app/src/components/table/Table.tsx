import type { TableBaseProps } from "./types";
import Body from "./Body";
import Cell from "./Cell";
import Head from "./Head";
import Header from "./Header";
import Row from "./Row";
import styles from "./index.module.css";

const Table = ({ children }: TableBaseProps) => {
  return <table className={styles.table}>{children}</table>;
};

Table.Body = Body;
Table.Cell = Cell;
Table.Head = Head;
Table.Header = Header;
Table.Row = Row;

export default Table;
