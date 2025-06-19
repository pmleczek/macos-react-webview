import { SidebarLayout } from '@layouts';
import { notification } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui';

const Notifications = () => {
  const [requestStatus, setRequestStatus] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    notification.getPermissionsAsync().then(setStatus);
  }, []);

  const requestPermissions = useCallback(async () => {
    const result = await notification.requestPermissionsAsync();
    setRequestStatus(String(result));
    notification.getPermissionsAsync().then(setStatus);
  }, []);

  const scheduleNotificationNow = useCallback(() => {
    notification.scheduleNotificationAsync({
      title: 'Test Notification',
      body: 'Scheduled for: now',
    });
  }, []);

  const scheduleNotification30s = useCallback(() => {
    notification.scheduleNotificationAsync({
      title: 'Test Notification',
      body: 'Scheduled for: 30 seconds',
      timeInterval: 30,
    });
  }, []);

  const scheduleNotificationEvery15 = useCallback(() => {
    notification.scheduleNotificationAsync({
      title: 'Test Notification',
      body: 'Scheduled for every 15th second',
      date: {
        second: 15,
      },
      repeats: true,
    });
  }, []);

  return (
    <SidebarLayout>
      <span>Notifications</span>
      <p>notification.getPermissionsAsync: {status}</p>
      <p>notification.requestPermissionsAsync: {requestStatus}</p>
      <Button label="Request permissions" onClick={requestPermissions} />
      <Button
        label="Schedule notification now"
        onClick={scheduleNotificationNow}
      />
      <Button
        label="Schedule notification in 30 seconds"
        onClick={scheduleNotification30s}
      />
      <Button
        label="Schedule notification for every 15th second"
        onClick={scheduleNotificationEvery15}
      />
    </SidebarLayout>
  );
};

export default Notifications;
