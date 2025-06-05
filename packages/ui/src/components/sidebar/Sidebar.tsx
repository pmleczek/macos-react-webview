import Header from './Header';
import Link from './Link';
import styles from './sidebar.module.css';
import TopBar from './TopBar';
import type { SidebarItem, SidebarProps } from './types';

const renderItem = (item: SidebarItem) => {
  if (item.type === 'header') {
    return <Header key={item.label} label={item.label} />;
  }

  return (
    <Link key={item.label} icon={item.icon} label={item.label} to={item.to} />
  );
};

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.inner_container}>
        {items.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;
