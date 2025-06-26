import { SidebarLayout } from '@layouts';
import { Breadcrumbs, MenuBar } from 'ui';

import styles from './clipboard.module.css';
import Image from './Image';
import Text from './Text';

const Clipboard = () => {
  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="📋 Clipboard" to="/clipboard" />
          </Breadcrumbs>
        }
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Clipboard</h1>
        <Text />
        <Image />
      </div>
    </SidebarLayout>
  );
};

export default Clipboard;
