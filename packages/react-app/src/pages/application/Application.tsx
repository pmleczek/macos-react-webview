import { SidebarLayout } from '@layouts';
import { Breadcrumbs, MenuBar } from 'ui';

import styles from './application.module.css';
import Properties from './Properties';
import Theme from './Theme';

const Application = () => {
  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="💻 Application" to="/application" />
          </Breadcrumbs>
        }
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Application</h1>
        <Theme />
        <Properties />
      </div>
    </SidebarLayout>
  );
};

export default Application;
