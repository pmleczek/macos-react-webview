export const EventScope = {
  Application: 'application:',
  Notification: 'notification:',
} as const;

export const ApplicationEvent = {
  GetTheme: EventScope.Application + 'get-theme',
  SetTheme: EventScope.Application + 'set-theme',
  GetProperty: EventScope.Application + 'get-property',
} as const;

export const NotificationEvent = {
  GetPermissions: EventScope.Notification + 'get-permissions',
  RequestPermissions: EventScope.Notification + 'request-permissions',
  Schedule: EventScope.Notification + 'schedule',
  GetScheduledNotifications: EventScope.Notification + 'get-scheduled',
  GetDisplayedNotifications: EventScope.Notification + 'get-displayed',
  CancelAllScheduled: EventScope.Notification + 'cancel-all-scheduled',
  DismissAllDisplayed: EventScope.Notification + 'dismiss-all-displayed',
  CancelScheduled: EventScope.Notification + 'cancel-scheduled',
  DismissDisplayed: EventScope.Notification + 'dismiss-displayed',
} as const;
