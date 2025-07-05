const EventScope = 'data:';

export const DataEvent = {
  FetchAllItems: EventScope + 'item-fetch-all',
  FetchItem: EventScope + 'item-fetch',
  CreateItem: EventScope + 'item-create',
} as const;
