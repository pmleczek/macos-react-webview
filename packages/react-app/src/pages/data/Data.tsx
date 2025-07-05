import { hideSidebarAtom } from '@state/atoms';
import { createItemAsync, fetchAllItemsAsync, fetchItemAsync } from 'data';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { Breadcrumbs, Button, MenuBar, TextInput } from 'ui';

import styles from './data.module.css';

const Data = () => {
  const [hideSidebar, setHideSidebar] = useAtom(hideSidebarAtom);

  const [titleValue, setTitleValue] = useState<string>('');
  const [createResponse, setCreateResponse] = useState<object>({});
  const [fetchAllResponse, setFetchAllResponse] = useState<object[]>([]);
  const [idQuery, setIdQuery] = useState<string>('');
  const [fetchResponse, setFetchResponse] = useState<object>({});

  const createItem = useCallback(async () => {
    try {
      const item = await createItemAsync({ title: titleValue });
      setCreateResponse(item);
    } catch (error) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setCreateResponse({ error: message });
      }
    }
  }, [titleValue]);

  const fetchAllItems = useCallback(async () => {
    try {
      const items = await fetchAllItemsAsync();
      setFetchAllResponse(items);
    } catch (error) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setFetchAllResponse([{ error: message }]);
      }
    }
  }, []);

  const fetchItem = useCallback(async (id: string) => {
    try {
      const item = await fetchItemAsync(id);
      setFetchResponse(item);
    } catch (error) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        console.log(message);
        setFetchResponse({ error: message });
      }
    }
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
        <h2 className={styles.subtitle}>Fetch all items</h2>
        <h2 className={styles.property_name}>
          Fetch all response: {JSON.stringify(fetchAllResponse, null, 2)}
        </h2>
        <div className={styles.button_container}>
          <Button label="Fetch all" onClick={fetchAllItems} />
        </div>
        <h2 className={styles.subtitle}>Fetch single item</h2>
        <h2 className={styles.property_name}>
          Fetch item response: {JSON.stringify(fetchResponse, null, 2)}
        </h2>
        <TextInput
          value={idQuery}
          onChange={setIdQuery}
          placeholder="Item ID"
        />
        <div className={styles.button_container}>
          <Button
            disabled={idQuery === ''}
            label="Fetch item with ID"
            onClick={() => fetchItem(idQuery)}
          />
        </div>
        <h2 className={styles.subtitle}>Create item</h2>
        <h2 className={styles.property_name}>
          Create item response: {JSON.stringify(createResponse, null, 2)}
        </h2>
        <TextInput
          value={titleValue}
          onChange={setTitleValue}
          placeholder="Item ID"
        />
        <div className={styles.button_container}>
          <Button
            disabled={titleValue === ''}
            label="Create item"
            onClick={createItem}
          />
        </div>
      </div>
    </>
  );
};

export default Data;
