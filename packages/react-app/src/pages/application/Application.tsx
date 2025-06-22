import { SidebarLayout } from '@layouts';
import type { Theme } from 'api';
import { application } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { Breadcrumbs, Button, MenuBar } from 'ui';

import styles from './application.module.css';

const Application = () => {
  const [appTheme, setAppTheme] = useState<string>('');

  const getTheme = useCallback(() => {
    application.getThemeAsync().then(setAppTheme);
  }, []);

  useEffect(() => {
    getTheme();
  }, [getTheme]);

  const setTheme = (theme: Theme) => async () => {
    const result = await application.setThemeAsync(theme);
    setAppTheme(result);
  };

  return (
    <SidebarLayout>
      <MenuBar
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumbs.Link label="💻 Application" to="/application" />
          </Breadcrumbs>
        }
      />
      <div className={styles.container}>
        <h1 className={styles.title}>Application</h1>
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
    </SidebarLayout>
  );
};

export default Application;
