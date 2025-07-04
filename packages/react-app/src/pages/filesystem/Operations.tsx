import { filesystem } from 'api';
import { useCallback, useState } from 'react';
import { Button } from 'ui';

import styles from './filesystem.module.css';

const Operations = () => {
  const [moveResult, setMoveResult] = useState<string>('');
  const [copyResult, setCopyResult] = useState<string>('');
  const [removeResult, setRemoveResult] = useState<string>('');
  const [infoResult, setInfoResult] = useState<object>({});

  const move = useCallback(async (from: string, to: string) => {
    try {
      await filesystem.moveAsync(from, to);
      setMoveResult('success');
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setMoveResult('error: ' + message);
      }
    }
  }, []);

  const copy = useCallback(async (from: string, to: string) => {
    try {
      await filesystem.copyAsync(from, to);
      setCopyResult('success');
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setCopyResult('error: ' + message);
      }
    }
  }, []);

  const remove = useCallback(async (path: string) => {
    try {
      await filesystem.removeAsync(path);
      setRemoveResult('success');
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setRemoveResult('error: ' + message);
      }
    }
  }, []);

  const getInfo = useCallback(async (path: string) => {
    try {
      const result = await filesystem.getInfoAsync(path);
      setInfoResult(result);
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setInfoResult({ error: message });
      }
    }
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>Move/copy/remove</h2>
      <p className={styles.property_name}>Move result: {moveResult}</p>
      <div className={styles.button_container}>
        <Button
          label="Move /tmp/test/text.txt to /tmp/test/file.txt"
          onClick={() => move('/tmp/test/text.txt', '/tmp/test/file.txt')}
        />
      </div>

      <p className={styles.property_name}>Copy result: {copyResult}</p>
      <div className={styles.button_container}>
        <Button
          label="Copy /tmp/test/text.txt to /tmp/test/text2.txt"
          onClick={() => copy('/tmp/test/text.txt', '/tmp/test/text2.txt')}
        />
      </div>

      <p className={styles.property_name}>Remove result: {removeResult}</p>
      <div className={styles.button_container}>
        <Button
          label="Remove /tmp/test/text.txt"
          onClick={() => remove('/tmp/test/text.txt')}
        />
        <Button label="Remove /tmp/test" onClick={() => remove('/tmp/test')} />
      </div>

      <p className={styles.property_name}>
        Get info result: {JSON.stringify(infoResult, undefined, 2)}
      </p>
      <div className={styles.button_container}>
        <Button
          label="Get info for /tmp/some-nonexisting-folder"
          onClick={() => getInfo('/tmp/some-nonexisting-folder')}
        />
        <Button
          label="Get info for /tmp/test"
          onClick={() => getInfo('/tmp/test')}
        />
        <Button
          label="Get info for /tmp/test/text.txt"
          onClick={() => getInfo('/tmp/test/text.txt')}
        />
      </div>
    </div>
  );
};

export default Operations;
