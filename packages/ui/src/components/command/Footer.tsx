import Kbd from '../kbd';
import styles from './command.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.key_container}>
        <Kbd keys="esc" />
        Close
      </div>
      <div className={styles.keys}>
        <div className={styles.key_container}>
          <Kbd keys="↑" />
          Previous
        </div>
        <div className={styles.key_container}>
          <Kbd keys="↓" />
          Next
        </div>
        <div className={styles.key_container}>
          <Kbd keys="↵" />
          Select
        </div>
      </div>
    </div>
  );
};

export default Footer;
