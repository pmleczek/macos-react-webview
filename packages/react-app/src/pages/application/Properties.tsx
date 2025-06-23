import type { PropertyKey } from 'api';
import { application } from 'api';
import { useCallback, useEffect, useState } from 'react';

import styles from './application.module.css';
import { ApplicationPropertyEntry } from './types';

const APP_PROPERTIES: ApplicationPropertyEntry[] = [
  {
    key: 'bundleIdentifier',
    title: 'Bundle identifier',
  },
  {
    key: 'appName',
    title: 'Application name',
  },
  {
    key: 'appVersion',
    title: 'Application version',
  },
  {
    key: 'buildNumber',
    title: 'Build number',
  },
];

const Properties = () => {
  const [values, setValues] = useState<Record<PropertyKey, string>>({});

  const getValues = useCallback(async () => {
    APP_PROPERTIES.forEach(async (entry) => {
      const value = await application.getPropertyAsync(entry.key);
      setValues((prev) => ({ ...prev, [entry.key]: value }));
    });
  }, []);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <div>
      <h2 className={styles.subtitle}>Application properties</h2>
      {APP_PROPERTIES.map((entry) => (
        <p>
          <span className={styles.property_name}>{entry.title}: </span>
          {values[entry.key] ?? ''}
        </p>
      ))}
    </div>
  );
};

export default Properties;
