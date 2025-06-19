import { emitTwoWayEvent } from 'ipc';

import { Space } from './types';

const MUTATION = {
  CREATE_SPACE: 'data:create-space',
} as const;

export const createSpace = async (newSpace: Partial<Space>): Promise<Space> => {
  const response = await emitTwoWayEvent<Partial<Space>, Space>(
    MUTATION.CREATE_SPACE,
    newSpace,
  );

  return response;
};
