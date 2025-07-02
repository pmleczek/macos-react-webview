export const EventScope = {
  Application: 'application:',
  Clipboard: 'clipboard:',
  FileSystem: 'filesystem:',
  Notification: 'notification:',
} as const;

export const ApplicationEvent = {
  GetTheme: EventScope.Application + 'get-theme',
  SetTheme: EventScope.Application + 'set-theme',
  GetProperty: EventScope.Application + 'get-property',
  Hide: EventScope.Application + 'hide',
  Show: EventScope.Application + 'show',
  Quit: EventScope.Application + 'quit',
  UpdateExclusionZones: EventScope.Application + 'update-exclusion-zones',
} as const;

export const ClipboardEvent = {
  Clear: EventScope.Clipboard + 'clear',
  ReadText: EventScope.Clipboard + 'read-text',
  WriteText: EventScope.Clipboard + 'write-text',
  ReadImage: EventScope.Clipboard + 'read-image',
  WriteImage: EventScope.Clipboard + 'write-image',
  ReadImageBase64: EventScope.Clipboard + 'read-image-base64',
  WriteImageBase64: EventScope.Clipboard + 'write-image-base64',
} as const;

export const FileSystemEvent = {
  OpenDialog: EventScope.FileSystem + 'open-dialog',
  OpenSaveDialog: EventScope.FileSystem + 'open-save-dialog',
  ReadFile: EventScope.FileSystem + 'read-file',
  WriteFile: EventScope.FileSystem + 'write-file',
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
