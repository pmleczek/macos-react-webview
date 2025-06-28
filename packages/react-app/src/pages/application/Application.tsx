import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

import styles from './application.module.css';
import Controls from './Controls';
import Properties from './Properties';
import Theme from './Theme';

const Application = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  return (
    <>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="💻 Application" to="/application" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Application</h1>
        <Theme />
        <Properties />
        <Controls />
      </div>
    </>
  );
};

export default Application;
