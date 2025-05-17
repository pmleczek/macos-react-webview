import cs from "classnames";

import type { ModalContainerProps } from "./types";
import styles from "./index.module.css";

const Container = ({ children, className }: ModalContainerProps) => {
  return (
    <div className={cs(styles.modal_container, className)}>{children}</div>
  );
};

export default Container;
