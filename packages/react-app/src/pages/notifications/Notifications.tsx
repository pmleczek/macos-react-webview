import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

import DisplayedNotifications from './DisplayedNotifications';
import styles from './notifications.module.css';
import Permissions from './Permissions';
import ScheduledNotifications from './ScheduledNotifications';

const Notifications = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  return (
    <>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🔔 Notifications" to="/notifications" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Notifications</h1>
        <Permissions />
        <ScheduledNotifications />
        <DisplayedNotifications />
      </div>
    </>
  );
};

export default Notifications;
