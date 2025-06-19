import { emitTwoWayEvent } from 'ipc';

import { Space } from './types';

const QUERY = {
  GET_SPACES: 'data:get-spaces',
} as const;

export const fetchSpaces = async () => {
  const response = await emitTwoWayEvent<undefined, Space[]>(QUERY.GET_SPACES);

  const defaultSpace: Space = {
    emoji: '🌎',
    title: 'Default',
    slug: 'default',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return [defaultSpace, ...response];
};
