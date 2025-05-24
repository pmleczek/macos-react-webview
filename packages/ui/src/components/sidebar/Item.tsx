import cs from 'classnames';
import { NavLink } from 'react-router';

import styles from './sidebar.module.css';
import type { SidebarItemProps } from './types';

const Item = ({ label, to }: SidebarItemProps) => {
  return (
    <NavLink
      className={({ isActive }) => cs(styles.item, isActive && styles.active)}
      to={to}
    >
      <span className={styles.item_label}>{label}</span>
    </NavLink>
  );
};

export default Item;
