import styles from './modal.module.css';
import type { BaseModalProps } from './types';

const Body = ({ children }: BaseModalProps) => {
  return <div className={styles.body_container}>{children}</div>;
};

export default Body;
