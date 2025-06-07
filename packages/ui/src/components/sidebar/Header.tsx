import Button from '../button';
import styles from './sidebar.module.css';
import type { SidebarHeaderProps } from './types';

const Header = ({ icon, label, onClick }: SidebarHeaderProps) => {
  return (
    <div className={styles.header_container}>
      <span className={styles.header}>{label}</span>
      {icon && (
        <Button.Icon
          className={styles.header_button}
          hoverBackground={false}
          icon={icon}
          onClick={onClick}
          iconProps={{ size: 20 }}
        />
      )}
    </div>
  );
};

export default Header;
