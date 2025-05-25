import styles from './button.module.css';
import Icon from './Icon';
import type { ButtonProps } from './types';

const Button = ({ label, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button className={styles.container} onClick={onClick} type={type}>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

Button.Icon = Icon;

export default Button;
