import cs from 'classnames';

import styles from './menubar.module.css';
import Separator from './Separator';
import SidebarToggle from './SidebarToggle';
import type { MenuBarProps } from './types';

const MenuBar = ({
  breadcrumbs,
  onToggleSidebar,
  sideBarHidden,
  sideBarToggle,
}: MenuBarProps) => {
  return (
    <div
      className={cs(styles.container, sideBarHidden && styles.sidebar_hidden)}
    >
      {sideBarToggle && (
        <>
          <SidebarToggle onToggle={onToggleSidebar} />
          <Separator />
        </>
      )}
      {breadcrumbs}
    </div>
  );
};

export default MenuBar;
