import styles from './kbd.module.css';
import type { KbdProps } from './types';

const Kbd = ({ keys }: KbdProps) => {
  return <kbd className={styles.container}>{keys}</kbd>;
};

export default Kbd;
