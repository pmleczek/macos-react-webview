import styles from './modal.module.css';
import type { BaseModalProps } from './types';

const Footer = ({ children }: BaseModalProps) => {
  return <div className={styles.footer_container}>{children}</div>;
};

export default Footer;
