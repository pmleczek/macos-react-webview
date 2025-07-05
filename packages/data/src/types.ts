export interface Item {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface ItemInput {
  title: string;
}

export type FetchAllItemsResponse =
  | {
      items: Item[];
    }
  | {
      error: string;
    };

export interface FetchItemRequest {
  id: string;
}

export type FetchItemResponse =
  | {
      item: Item;
    }
  | { error: string };

export interface CreateItemRequest {
  item: ItemInput;
}

export type CreateItemResponse =
  | {
      item: Item;
    }
  | { error: string };

export interface DeleteItemRequest {
  id: string;
}

export type DeleteItemResponse =
  | {
      item: Item;
    }
  | { error: string };

export interface UpdateItemRequest {
  id: string;
  title: string;
}

export type UpdateItemResponse =
  | {
      item: Item;
    }
  | { error: string };
