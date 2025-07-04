import { hideSidebarAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { Breadcrumbs, MenuBar } from 'ui';

import Dialog from './Dialog';
import Directory from './Directory';
import styles from './filesystem.module.css';
import Operations from './Operations';
import ReadWrite from './ReadWrite';

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
        <ReadWrite />
        <Directory />
        <Operations />
      </div>
    </>
  );
};

export default FileSystem;
