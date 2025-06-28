import { ipcHandler } from 'ipc';
import { useEffect } from 'react';

import styles from './command.module.css';
import type { CommandBodyProps } from './types';

const Body = ({ children }: CommandBodyProps) => {
  useEffect(() => {
    const enterListener = ipcHandler.register('application:enter', () => {
      console.log('Enter');
    });

    return () => {
      ipcHandler.unregister(enterListener);
    };
  }, []);

  return <div className={styles.body}>{children}</div>;
};

export default Body;
