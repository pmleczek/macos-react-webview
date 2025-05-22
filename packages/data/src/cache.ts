import type { QueryKey, QueryRecord } from './types';

const cache = new Map<QueryKey, QueryRecord<unknown>>();

export default cache;
