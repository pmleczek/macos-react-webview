import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

import Dialog from './Dialog';
import styles from './filesystem.module.css';

const FileSystem = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  return (
    <>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🗂️ File System" to="/clipboard" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
      <div className={styles.container}>
        <Dialog />
      </div>
    </>
  );
};

export default FileSystem;
