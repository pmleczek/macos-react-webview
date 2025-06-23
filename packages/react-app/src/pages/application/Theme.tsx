import type { Theme as ThemeType } from 'api';
import { application } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { Button } from 'ui';

import styles from './application.module.css';

const Theme = () => {
  const [appTheme, setAppTheme] = useState<string>('');

  const getTheme = useCallback(() => {
    application.getThemeAsync().then(setAppTheme);
  }, []);

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const setTheme = (theme: ThemeType) => async () => {
    const result = await application.setThemeAsync(theme);
    setAppTheme(result);
  };

  return (
    <div>
      <h2 className={styles.subtitle}>Theme</h2>
      <p>
        <span className={styles.property_name}>getThemeAsync: </span>
        {appTheme}
      </p>
      <p className={styles.property_name}>setThemeAsync</p>
      <div className={styles.button_container}>
        <Button label="Light" onClick={setTheme('light')} />
        <Button label="Dark" onClick={setTheme('dark')} />
        <Button label="System" onClick={setTheme('system')} />
      </div>
    </div>
  );
};

export default Theme;
