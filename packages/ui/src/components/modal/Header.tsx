import styles from './modal.module.css';
import type { BaseModalProps } from './types';

const Header = ({ children }: BaseModalProps) => {
  return <div className={styles.header_container}>{children}</div>;
};

export default Header;
