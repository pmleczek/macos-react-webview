import { emitTwoWayEvent } from 'ipc';

import { DataEvent } from './events';
import type {
  CreateItemRequest,
  CreateItemResponse,
  FetchAllItemsResponse,
  FetchItemRequest,
  FetchItemResponse,
  Item,
  ItemInput,
} from './types';

export const fetchAllItemsAsync = async (): Promise<Item[]> => {
  const response = await emitTwoWayEvent<undefined, FetchAllItemsResponse>(
    DataEvent.FetchAllItems,
  );

  if ('error' in response) {
    throw new Error(response.error);
  }

  return response.items;
};

export const fetchItemAsync = async (id: string): Promise<Item> => {
  const response = await emitTwoWayEvent<FetchItemRequest, FetchItemResponse>(
    DataEvent.FetchItem,
    { id },
  );

  if ('error' in response) {
    throw new Error(response.error);
  }

  return response.item;
};

export const createItemAsync = async (item: ItemInput): Promise<Item> => {
  const response = await emitTwoWayEvent<CreateItemRequest, CreateItemResponse>(
    DataEvent.CreateItem,
    { item },
  );

  if ('error' in response) {
    throw new Error(response.error);
  }

  return response.item;
};
