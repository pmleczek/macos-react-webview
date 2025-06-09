import { emitTwoWayEvent } from 'ipc';

import ipcHandler from './ipcHandler';
import { Space } from './types';

const QUERY = {
  GET_SPACES: 'data:get-spaces',
} as const;

export const fetchSpaces = async () => {
  const response = await emitTwoWayEvent<undefined, Space[]>(
    QUERY.GET_SPACES,
    undefined,
    ipcHandler,
  );

  response.push({
    emoji: '🌎',
    title: 'Default',
    slug: 'default',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return response;
};
