import Header from './Header';
import Link from './Link';
import Search from './Search';
import styles from './sidebar.module.css';
import TopBar from './TopBar';
import type { SidebarItem, SidebarProps } from './types';

const renderItem = (item: SidebarItem) => {
  if (item.type === 'header') {
    return (
      <Header
        key={item.label}
        label={item.label}
        icon={item.icon}
        onClick={item.onClick}
      />
    );
  }

  if (item.type === 'group') {
    return (
      <div key={item.header.label}>
        <Header
          label={item.header.label}
          icon={item.header.icon}
          onClick={item.header.onClick}
        />
        {item.items.map((linkItem) => (
          <Link
            key={linkItem.label}
            emoji={linkItem.emoji}
            icon={linkItem.icon}
            label={linkItem.label}
            to={linkItem.to}
          />
        ))}
      </div>
    );
  }

  return (
    <Link
      key={item.label}
      emoji={item.emoji}
      icon={item.icon}
      label={item.label}
      to={item.to}
    />
  );
};

const Sidebar = ({ items, onToggleSearch, search }: SidebarProps) => {
  return (
    <div className={styles.container}>
      <TopBar />
      <div className={styles.inner_container}>
        {search && <Search onClick={onToggleSearch} />}
        {items.map((item) => renderItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;
