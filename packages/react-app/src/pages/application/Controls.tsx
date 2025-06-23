import { application } from 'api';
import { useCallback } from 'react';
import { Button } from 'ui';

import styles from './application.module.css';

const Controls = () => {
  const hideAndShow = useCallback(async () => {
    application.hide();
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    application.show();
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>Application controls</h2>
      <div className={styles.button_container}>
        <Button label="Hide" onClick={() => application.hide()} />
        <Button label="Hide & show" onClick={hideAndShow} />
        <Button label="Quit" onClick={() => application.quit()} />
      </div>
    </div>
  );
};

export default Controls;
