import type { NotificationPermissionStatus } from './types';

export const toPermissionStatus = (
  authorizationStatus: number,
): NotificationPermissionStatus => {
  if (authorizationStatus === 1) {
    return 'denied';
  }

  if (authorizationStatus === 2) {
    return 'granted';
  }

  if (authorizationStatus === 3) {
    return 'provisional';
  }

  return 'notDetermined';
};
