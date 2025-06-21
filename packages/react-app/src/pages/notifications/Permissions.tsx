import { notification } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui';

import styles from './notifications.module.css';

const Permissions = () => {
  const [permissionStatus, setPermissionStatus] = useState<string>('');
  const [requestStatus, setRequestStatus] = useState<string>('');

  useEffect(() => {
    notification.getPermissionsAsync().then(setPermissionStatus);
  }, []);

  const requestPermissions = useCallback(async () => {
    const result = await notification.requestPermissionsAsync();
    setRequestStatus(String(result));
    notification.getPermissionsAsync().then(setPermissionStatus);
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>Permissions</h2>
      <p>
        <span className={styles.property_name}>getPermissionsAsync: </span>
        {permissionStatus}
      </p>
      <p>
        <span className={styles.property_name}>requestPermissionsAsync: </span>
        {requestStatus}
      </p>
      <div className={styles.button_container}>
        <Button label="Request permissions" onClick={requestPermissions} />
      </div>
    </div>
  );
};

export default Permissions;
