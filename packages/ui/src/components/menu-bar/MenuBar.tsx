import styles from './menubar.module.css';
import type { MenuBarProps } from './types';

const MenuBar = ({ breadcrumbs }: MenuBarProps) => {
  return <div className={styles.container}>{breadcrumbs}</div>;
};

export default MenuBar;
