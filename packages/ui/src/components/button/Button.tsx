import cs from 'classnames';

import styles from './button.module.css';
import Icon from './Icon';
import type { ButtonProps } from './types';

const Button = ({
  className,
  disabled,
  label,
  noDrag,
  onClick,
  type = 'button',
  variant = 'primary',
}: ButtonProps) => {
  return (
    <button
      className={cs(styles.container, className, styles[variant])}
      disabled={disabled}
      onClick={onClick}
      type={type}
      data-drag={noDrag ? 'none' : undefined}
    >
      <span className={styles.label}>{label}</span>
    </button>
  );
};

Button.Icon = Icon;

export default Button;
