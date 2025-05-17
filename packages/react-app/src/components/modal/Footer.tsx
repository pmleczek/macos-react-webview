import type { ModalFooterProps } from "./types";
import styles from "./index.module.css";

const Footer = ({ children }: ModalFooterProps) => {
  return <div className={styles.modal_footer}>{children}</div>;
};

export default Footer;
