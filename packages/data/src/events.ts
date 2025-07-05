const EventScope = 'data:';

export const DataEvent = {
  FetchAllItems: EventScope + 'item-fetch-all',
  FetchItem: EventScope + 'item-fetch',
  CreateItem: EventScope + 'item-create',
  RemoveItem: EventScope + 'item-delete',
  UpdateItem: EventScope + 'item-update',
} as const;
