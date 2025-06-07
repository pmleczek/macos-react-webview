import Icon from '../icon';
import styles from './breadcrumbs.module.css';

const Separator = () => {
  return <Icon className={styles.separator} name="chevron_right" size={16} />;
};

export default Separator;
