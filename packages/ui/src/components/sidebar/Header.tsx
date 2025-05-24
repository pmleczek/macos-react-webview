import styles from './sidebar.module.css';
import type { SidebarHeaderProps } from './types';

const Header = ({ label }: SidebarHeaderProps) => {
  return <span className={styles.header}>{label}</span>;
};

export default Header;
