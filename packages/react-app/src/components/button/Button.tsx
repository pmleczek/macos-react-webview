import type { ButtonProps } from "./types";
import styles from "./index.module.css";

const Button = ({ label, onClick, type }: ButtonProps) => {
  return (
    <button
      className={styles.button_container}
      onClick={onClick}
      type={type ?? "button"}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
