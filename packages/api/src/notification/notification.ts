import { emitTwoWayEvent } from 'ipc';

import { NotificationEvent } from '../events';
import type {
  GetPermissionsResponse,
  NotificationPermissionStatus,
  RequestPermissionsResponse,
  ScheduleRequest,
  ScheduleResponse,
} from './types';
import { toPermissionStatus } from './utils';

const getPermissionsAsync = async (): Promise<NotificationPermissionStatus> => {
  const response = await emitTwoWayEvent<undefined, GetPermissionsResponse>(
    NotificationEvent.GetPermissions,
  );
  return toPermissionStatus(response.authorizationStatus);
};

const requestPermissionsAsync = async (): Promise<boolean> => {
  const response = await emitTwoWayEvent<undefined, RequestPermissionsResponse>(
    NotificationEvent.RequestPermissions,
  );
  return response.granted;
};

const scheduleNotificationAsync = async (
  request: ScheduleRequest,
): Promise<string | null> => {
  const response = await emitTwoWayEvent<ScheduleRequest, ScheduleResponse>(
    NotificationEvent.Schedule,
    request,
  );
  return response.id;
};

const notification = {
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
};

export default notification;
