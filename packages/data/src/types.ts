export type QueryKey = string;

export type QueryStatus = 'success' | 'error' | 'loading';

export interface QueryRecord<T> {
  key: QueryKey;
  status: QueryStatus;
  data: T | null;
  error: Error | null;
}
