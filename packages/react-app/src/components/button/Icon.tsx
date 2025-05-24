import type { ButtonIconProps } from "./types";
import { Icon as IconComponent } from "ui";
import styles from "./index.module.css";

const Icon = ({ icon, iconProps, onClick, type }: ButtonIconProps) => {
  return (
    <button
      className={styles.button_icon}
      onClick={onClick}
      type={type ?? "button"}
    >
      <IconComponent {...iconProps} name={icon} />
    </button>
  );
};

export default Icon;
