import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

import styles from './clipboard.module.css';
import Image from './Image';
import Text from './Text';

const Clipboard = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  return (
    <>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="📋 Clipboard" to="/clipboard" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Clipboard</h1>
        <Text />
        <Image />
      </div>
    </>
  );
};

export default Clipboard;
