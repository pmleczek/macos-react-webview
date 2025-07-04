import { filesystem } from 'api';
import { useCallback, useState } from 'react';
import { Button } from 'ui';

import styles from './filesystem.module.css';

const Directory = () => {
  const [directoryContent, setDirectoryContent] = useState<string[]>([]);
  const [mkdirResponse, setMkdirResponse] = useState<string>('');

  const readDirectory = useCallback(async (path: string) => {
    try {
      const results = await filesystem.readDirectoryAsync(path);
      if (results.length === 0) {
        setDirectoryContent(['Empty']);
      } else {
        setDirectoryContent(results);
      }
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setDirectoryContent(['Error reading directory at: ' + path, message]);
      }
    }
  }, []);

  const makeDirectory = useCallback(async (path: string) => {
    try {
      await filesystem.makeDirectoryAsync(path);
      setMkdirResponse('success');
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setMkdirResponse('Error making directory: ' + path + '\n' + message);
      }
    }
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>Make directory</h2>
      <p className={styles.property_name}>
        Make directory response: {mkdirResponse}
      </p>
      <div className={styles.button_container}>
        <Button
          label="Make directory: /tmp/test"
          onClick={() => makeDirectory('/tmp/test')}
        />
      </div>

      <h2 className={styles.subtitle}>Read directory</h2>
      <p className={styles.property_name}>Directory contents: </p>
      <ul>
        {directoryContent.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className={styles.button_container}>
        <Button
          label="Read directory: /tmp/test"
          onClick={() => readDirectory('/tmp/test')}
        />
      </div>
    </div>
  );
};

export default Directory;
