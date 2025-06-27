import Icon from '../icon';
import Kbd from '../kbd';
import styles from './sidebar.module.css';
import type { SidebarSearchProps } from './types';

const Search = ({ onClick }: SidebarSearchProps) => {
  return (
    <button className={styles.search_container} type="button" onClick={onClick}>
      <div className={styles.search_inner_container}>
        <Icon className={styles.search_icon} name="search" size={16} />
        <span className={styles.search_label}>Search</span>
      </div>
      <Kbd keys="⌘+K" />
    </button>
  );
};

export default Search;
