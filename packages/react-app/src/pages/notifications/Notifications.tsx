import { SidebarLayout } from '@layouts';
import { Breadcrumbs, MenuBar } from 'ui';

import DisplayedNotifications from './DisplayedNotifications';
import styles from './notifications.module.css';
import Permissions from './Permissions';
import ScheduledNotifications from './ScheduledNotifications';

const Notifications = () => {
  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🔔 Notifications" to="/notifications" />
          </Breadcrumbs>
        }
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Notifications</h1>
        <Permissions />
        <ScheduledNotifications />
        <DisplayedNotifications />
      </div>
    </SidebarLayout>
  );
};

export default Notifications;
