import { emitOneWayEvent, emitTwoWayEvent } from 'ipc';

import { NotificationEvent } from '../events';
import {
  type CancelScheduledRequest,
  type DismissDisplayedRequest,
  type DisplayedNotification,
  type GetDisplayedResponse,
  type GetPermissionsResponse,
  type GetScheduledResponse,
  type NotificationPermissionStatus,
  type RequestPermissionsResponse,
  type ScheduledNotification,
  type ScheduleRequest,
  type ScheduleResponse,
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

const getScheduledNotificationsAsync = async (): Promise<
  ScheduledNotification[]
> => {
  const response = await emitTwoWayEvent<undefined, GetScheduledResponse>(
    NotificationEvent.GetScheduledNotifications,
  );
  return response;
};

const getDisplayedNotificationsAsync = async (): Promise<
  DisplayedNotification[]
> => {
  const response = await emitTwoWayEvent<undefined, GetDisplayedResponse>(
    NotificationEvent.GetDisplayedNotifications,
  );
  return response;
};

const cancelAllScheduledNotifications = (): void => {
  emitOneWayEvent(NotificationEvent.CancelAllScheduled);
};

const dismissAllDisplayedNotifications = (): void => {
  emitOneWayEvent(NotificationEvent.DismissAllDisplayed);
};

const cancelScheduledNotifications = (ids: string[]): void => {
  emitOneWayEvent<CancelScheduledRequest>(NotificationEvent.CancelScheduled, {
    ids,
  });
};

const dismissDisplayedNotifications = (ids: string[]): void => {
  emitOneWayEvent<DismissDisplayedRequest>(NotificationEvent.DismissDisplayed, {
    ids,
  });
};

const notification = {
  getPermissionsAsync,
  requestPermissionsAsync,
  scheduleNotificationAsync,
  getScheduledNotificationsAsync,
  getDisplayedNotificationsAsync,
  cancelAllScheduledNotifications,
  dismissAllDisplayedNotifications,
  cancelScheduledNotifications,
  dismissDisplayedNotifications,
};

export default notification;
