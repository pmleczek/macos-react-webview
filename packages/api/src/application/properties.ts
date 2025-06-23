import { emitTwoWayEvent } from 'ipc';

import { ApplicationEvent } from '../events';
import type {
  GetPropertyRequest,
  GetPropertyResponse,
  PropertyKey,
} from './types';

export const getPropertyAsync = async (key: PropertyKey): Promise<string> => {
  const response = await emitTwoWayEvent<
    GetPropertyRequest,
    GetPropertyResponse
  >(ApplicationEvent.GetProperty + key, {
    key,
  });
  return response.value;
};
