import Button from '../button';
import styles from './menubar.module.css';
import type { SidebarToggleProps } from './types';

const SidebarToggle = ({ onToggle }: SidebarToggleProps) => {
  return (
    <Button.Icon
      className={styles.sidebar_toggle}
      icon="panel_left"
      onClick={onToggle}
      iconProps={{ size: 16 }}
      hoverBackground={false}
      noDrag
    />
  );
};

export default SidebarToggle;
