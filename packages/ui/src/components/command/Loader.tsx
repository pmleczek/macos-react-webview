import Icon from '../icon';
import styles from './command.module.css';

const Loader = () => {
  return (
    <div className={styles.empty_container}>
      <Icon className={styles.spinner} name="loader" />
    </div>
  );
};

export default Loader;
