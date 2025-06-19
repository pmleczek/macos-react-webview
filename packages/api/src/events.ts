export const EventScope = {
  Notification: 'notification:',
} as const;

export const NotificationEvent = {
  GetPermissions: EventScope.Notification + 'get-permissions',
  RequestPermissions: EventScope.Notification + 'request-permissions',
  Schedule: EventScope.Notification + 'schedule',
} as const;
