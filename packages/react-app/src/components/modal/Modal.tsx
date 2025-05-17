import cs from "classnames";

import type { ModalProps } from "./types";
import Container from "./Container";
import styles from "./index.module.css";

const Modal = ({ blur, children, onHide, show }: ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className={cs(styles.modal_overlay, blur && styles.modal_overlay_blur)}
      onClick={onHide}
    >
      <div
        className={styles.modal_content}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.Container = Container;

export default Modal;
