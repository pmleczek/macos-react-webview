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
  noDrag,
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
      data-drag={noDrag ? 'none' : undefined}
    >
      <IconComponent {...iconProps} name={icon} />
    </button>
  );
};

export default Icon;
