export type NotificationPermissionStatus =
  | 'notDetermined'
  | 'denied'
  | 'granted'
  | 'provisional';

export interface GetPermissionsResponse {
  authorizationStatus: number;
}

export interface RequestPermissionsResponse {
  granted: boolean;
}

export interface ScheduleRequest {
  // Notification identifier
  id?: string;
  // Notification content
  title: string;
  subtitle?: string;
  body: string;
  // Notification scheduling
  repeats?: boolean;
  // Interval-based scheduling
  timeInterval?: number;
  // Calendar-based scheduling
  date?: {
    day?: number;
    month?: number;
    year?: number;
    hour?: number;
    minute?: number;
    second?: number;
    weekday?: number;
  };
}

export interface ScheduleResponse {
  id: string | null;
}

export interface ScheduledNotification {
  id: string;
  repeats: boolean;
}

export type GetScheduledResponse = ScheduledNotification[];

export interface DisplayedNotification {
  id: string;
  date: number;
}

export type GetDisplayedResponse = DisplayedNotification[];

export interface CancelScheduledRequest {
  ids: string[];
}

export interface DismissDisplayedRequest {
  ids: string[];
}
