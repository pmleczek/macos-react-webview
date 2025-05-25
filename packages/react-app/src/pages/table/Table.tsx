import { useCallback, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Button } from 'ui';

import type { SampleItem } from './types';
import { Table } from '@components';
import { SidebarLayout } from '@layouts';
import styles from './index.module.css';
import NewItemModal from './NewItemModal';

const generateSampleItems = (count: number): SampleItem[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.alphanumeric({ casing: 'lower', length: 8 }),
    date: faker.date.anytime().toLocaleDateString(),
    emoji: faker.internet.emoji({ types: ['food', 'nature'] }),
    price: faker.finance.amount({ min: 0.1, max: 29.99, symbol: '$' }),
  }));
};

const TablePage = () => {
  const [data, setData] = useState<SampleItem[]>(generateSampleItems(10));
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteItem = useCallback((selectedItem: SampleItem) => {
    setData((prev) => prev.filter((item) => item.id !== selectedItem.id));
  }, []);

  return (
    <SidebarLayout>
      <div className="page-container">
        <div className={styles.filter_container}>
          <Button label="New item" onClick={() => setShowModal(true)} />
        </div>
        <Table<SampleItem>
          checkboxes
          columns={[
            {
              key: 'id',
              label: 'Id',
            },
            {
              key: 'date',
              label: 'Date',
            },
            {
              key: 'emoji',
              label: 'Emoji',
            },
            {
              key: 'price',
              label: 'Price',
            },
          ]}
          contextMenuItems={[
            {
              label: 'Edit',
              onSelect: (item) => {
                console.log('Edit');
                console.log(item);
              },
            },
            {
              label: 'Delete',
              onSelect: deleteItem,
            },
          ]}
          data={data}
          keyExtractor={(item) => item.id}
          renderRow={(item: SampleItem) => (
            <>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.emoji}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
            </>
          )}
        />
      </div>
      <NewItemModal
        onSuccess={(item) => setData((prev) => [...prev, item])}
        show={showModal}
        setShow={setShowModal}
      />
    </SidebarLayout>
  );
};

export default TablePage;
