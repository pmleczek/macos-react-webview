import cs from 'classnames';
import { NavLink } from 'react-router';

import Icon from '../icon';
import styles from './sidebar.module.css';
import type { SidebarLinkProps } from './types';

const Link = ({ icon, label, to }: SidebarLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) => cs(styles.item, isActive && styles.active)}
      to={to}
    >
      {icon ? <Icon name={icon} size={16} strokeWidth={1.75} /> : null}
      <span className={styles.item_label}>{label}</span>
    </NavLink>
  );
};

export default Link;
