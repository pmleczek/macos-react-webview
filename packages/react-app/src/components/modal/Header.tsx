import { Button } from "ui";
import type { ModalHeaderProps } from "./types";
import styles from "./index.module.css";

const Header = ({ onHide, title }: ModalHeaderProps) => {
  return (
    <div className={styles.modal_header}>
      <h3 className={styles.modal_title}>{title}</h3>
      <Button.Icon
        icon="close"
        onClick={onHide}
        iconProps={{
          strokeWidth: 2,
          size: 20,
        }}
      />
    </div>
  );
};

export default Header;
