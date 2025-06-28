import styles from './command.module.css';
import type { CommandHeaderProps } from './types';

const Header = ({ label }: CommandHeaderProps) => {
  return <span className={styles.header}>{label}</span>;
};

export default Header;
