import type { DisplayedNotification } from 'api';
import { notification } from 'api';
import cs from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui';

import styles from './notifications.module.css';

const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  return formatter.format(date);
};

const DisplayedNotifications = () => {
  const [notifications, setNotifications] = useState<DisplayedNotification[]>(
    [],
  );
  const [selectedId, setSelectedId] = useState<string>('');

  const getDisplayed = useCallback(async () => {
    setNotifications(await notification.getDisplayedNotificationsAsync());
  }, []);

  useEffect(() => {
    getDisplayed();
  }, [getDisplayed]);

  const dismissAll = useCallback(async () => {
    notification.dismissAllDisplayedNotifications();
    setSelectedId('');
    await new Promise((resolve) => setTimeout(resolve, 250));
    getDisplayed();
  }, [getDisplayed]);

  const dismissSelected = useCallback(async () => {
    notification.dismissDisplayedNotifications([selectedId]);
    setSelectedId('');
    await new Promise((resolve) => setTimeout(resolve, 250));
    getDisplayed();
  }, [getDisplayed, selectedId]);

  return (
    <div>
      <h2 className={styles.subtitle}>Displayed notifications</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.id_cell}>Identifier</th>
            <th>Date shown</th>
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
              <td>{formatDate(notification.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.button_container}>
        <Button label="Get displayed notifications" onClick={getDisplayed} />
        <Button label="Dismiss all" onClick={dismissAll} />
        <Button
          disabled={selectedId === ''}
          label="Dismiss selected"
          onClick={dismissSelected}
        />
      </div>
    </div>
  );
};

export default DisplayedNotifications;
