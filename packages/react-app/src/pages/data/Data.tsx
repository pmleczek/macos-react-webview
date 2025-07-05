import { hideSidebarAtom } from '@state/atoms';
import type { Item } from 'data';
import {
  createItemAsync,
  deleteItemAsync,
  fetchAllItemsAsync,
  fetchItemAsync,
  updateItemAsync,
} from 'data';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { Breadcrumbs, MenuBar } from 'ui';

import styles from './data.module.css';
import DataExample from './DataExample';

const Data = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  const createItemWrapper = useCallback(async (title: string) => {
    const result = createItemAsync({ title });
    return result;
  }, []);

  const updateItemWrapper = useCallback(async (id: string) => {
    const result = updateItemAsync(
      id,
      'Updated item ' + new Date().toTimeString(),
    );
    return result;
  }, []);

  return (
    <>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="🗃️ Data" to="/data" />
          </Breadcrumbs>
        }
        onToggleSidebar={() => setHideSidebar((prev) => !prev)}
        sideBarHidden={hideSidebar}
        sideBarToggle
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Data</h1>
        <DataExample<Item[]> label="Fetch all" method={fetchAllItemsAsync} />
        <DataExample<Item> label="Fetch" method={fetchItemAsync} input />
        <DataExample<Item> label="Create" method={createItemWrapper} input />
        <DataExample<Item> label="Delete" method={deleteItemAsync} input />
        <DataExample<Item> label="Update" method={updateItemWrapper} input />
      </div>
    </>
  );
};

export default Data;
