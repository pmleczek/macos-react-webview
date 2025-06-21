import type { ScheduledNotification, ScheduleRequest } from 'api';
import { notification } from 'api';
import cs from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui';

import styles from './notifications.module.css';

const NOTIFICATION_NOW: ScheduleRequest = {
  title: 'Test Notification',
  body: 'Scheduled for: now',
};

const NOTIFICATION_30_SECS: ScheduleRequest = {
  title: 'Test Notification',
  body: 'Scheduled for: 30 seconds',
  timeInterval: 30,
};

const NOTIFICATION_EVERY_15TH_SEC: ScheduleRequest = {
  title: 'Test Notification',
  body: 'Scheduled for every 15th second',
  date: {
    second: 15,
  },
  repeats: true,
};

const ScheduledNotifications = () => {
  const [notifications, setNotifications] = useState<ScheduledNotification[]>(
    [],
  );
  const [selectedId, setSelectedId] = useState<string>('');

  const getScheduled = useCallback(async () => {
    setNotifications(await notification.getScheduledNotificationsAsync());
  }, []);

  useEffect(() => {
    getScheduled();
  }, [getScheduled]);

  const scheduleNotification = useCallback(
    (notificationRequest: ScheduleRequest) => {
      notification.scheduleNotificationAsync(notificationRequest);
      getScheduled();
    },
    [getScheduled],
  );

  const cancelAll = useCallback(async () => {
    notification.cancelAllScheduledNotifications();
    setSelectedId('');
    await new Promise((resolve) => setTimeout(resolve, 250));
    getScheduled();
  }, [getScheduled]);

  const cancelSelected = useCallback(async () => {
    notification.cancelScheduledNotifications([selectedId]);
    setSelectedId('');
    await new Promise((resolve) => setTimeout(resolve, 250));
    getScheduled();
  }, [getScheduled, selectedId]);

  return (
    <div>
      <h2 className={styles.subtitle}>Scheduling</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.id_cell}>Identifier</th>
            <th>Repeats</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <tr
              className={cs(notification.id === selectedId && styles.selected)}
              key={notification.id}
              onClick={() => setSelectedId(notification.id)}
            >
              <td className={styles.id_cell}>{notification.id}</td>
              <td>{String(notification.repeats)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.button_container}>
        <Button
          label="Schedule for now"
          onClick={() => scheduleNotification(NOTIFICATION_NOW)}
        />
        <Button
          label="Schedule in 30 seconds"
          onClick={() => scheduleNotification(NOTIFICATION_30_SECS)}
        />
        <Button
          label="Schedule at every 15th second"
          onClick={() => scheduleNotification(NOTIFICATION_EVERY_15TH_SEC)}
        />
      </div>
      <div className={styles.button_container}>
        <Button label="Get scheduled notifications" onClick={getScheduled} />
        <Button label="Cancel all" onClick={cancelAll} />
        <Button
          disabled={selectedId === ''}
          label="Cancel selected"
          onClick={cancelSelected}
        />
      </div>
    </div>
  );
};

export default ScheduledNotifications;
