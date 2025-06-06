import cs from 'classnames';

import IconComponent from '../icon';
import styles from './button.module.css';
import type { IconButtonProps } from './types';

const Icon = ({
  className,
  disabled,
  hoverBackground = true,
  icon,
  iconProps,
  onClick,
  type = 'button',
}: IconButtonProps) => {
  return (
    <button
      className={cs(
        styles.icon,
        hoverBackground && styles.hover_background,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      <IconComponent {...iconProps} name={icon} />
    </button>
  );
};

export default Icon;
