import Item from './Item';
import styles from './sidebar.module.css';
import type { SidebarProps } from './types';

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Item label={item.label} to={item.to} />
      ))}
    </div>
  );
};

export default Sidebar;
