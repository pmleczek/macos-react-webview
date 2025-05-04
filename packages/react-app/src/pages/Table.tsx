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
  return (
    <HeaderLayout>
      <SidebarLayout>
        <div className="page-container">
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Emoji</Table.Head>
                <Table.Head>Price</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {generateSampleItems(10).map((item: SampleItem) => (
                <Table.Row
                  key={item.id}
                  hoverable
                  contextMenuItems={[
                    {
                      label: "Edit",
                      handler: () => console.log(),
                    },
                    {
                      label: "Delete",
                      handler: () => console.log(),
                    },
                  ]}
                >
                  <Table.Cell>{item.id}</Table.Cell>
                  <Table.Cell>{item.date.toLocaleString()}</Table.Cell>
                  <Table.Cell>{item.emoji}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </SidebarLayout>
    </HeaderLayout>
  );
};

export default TablePage;
