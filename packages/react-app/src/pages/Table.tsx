import { useState } from "react";
import { faker } from "@faker-js/faker";

import { Table } from "@components";
import { HeaderLayout, SidebarLayout } from "@layouts";

interface SampleItem {
  id: string;
  date: Date;
  emoji: string;
  price: string;
}

const generateSampleItems = (count: number): SampleItem[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.alphanumeric({ casing: "lower", length: 8 }),
    date: faker.date.anytime(),
    emoji: faker.internet.emoji({ types: ["food", "nature"] }),
    price: faker.finance.amount({ min: 0.1, max: 29.99, symbol: "$" }),
  }));
};

const TablePage = () => {
  const [data, setData] = useState<SampleItem[]>(generateSampleItems(10));

  return (
    <HeaderLayout>
      <SidebarLayout>
        <div className="page-container">
          <Table<SampleItem>
            checkboxes
            columns={[
              {
                key: "id",
                label: "Id",
              },
              {
                key: "date",
                label: "Date",
              },
              {
                key: "emoji",
                label: "Emoji",
              },
              {
                key: "price",
                label: "Price",
              },
            ]}
            contextMenuItems={[
              {
                label: "Edit",
                onSelect: (item) => {
                  console.log("Edit");
                  console.log(item);
                },
              },
              {
                label: "Delete",
                onSelect: (item) => {
                  console.log("Delete");
                  console.log(item);
                },
              },
            ]}
            data={data}
            keyExtractor={(item) => item.id}
            renderRow={(item: SampleItem) => (
              <>
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>{item.date.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{item.emoji}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
              </>
            )}
          />
        </div>
      </SidebarLayout>
    </HeaderLayout>
  );
};

export default TablePage;
