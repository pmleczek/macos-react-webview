import styles from './command.module.css';
import type { CommandEmptyProps } from './types';

const Empty = ({ message }: CommandEmptyProps) => {
  return (
    <div className={styles.empty_container}>
      <span className={styles.empty_message}>{message ?? ''}</span>
    </div>
  );
};

export default Empty;
