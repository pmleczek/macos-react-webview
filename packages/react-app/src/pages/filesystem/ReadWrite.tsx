import type { WriteFileOptions } from 'api';
import { filesystem } from 'api';
import { useCallback, useState } from 'react';
import { Button } from 'ui';

import styles from './filesystem.module.css';
import { FileData } from './types';

const ReadWrite = () => {
  const [results, setResults] = useState<FileData>({
    lastOperation: '-',
    data: '-',
    error: '-',
  });

  const readFile = useCallback(async (path: string) => {
    try {
      const fileContent = await filesystem.readFileAsync(path);
      setResults({
        lastOperation: 'readFileAsync',
        error: '-',
        data: fileContent,
      });
    } catch (error: unknown) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setResults({
          lastOperation: 'readFileAsync(' + path + ')',
          error: message,
          data: '-',
        });
      }
    }
  }, []);

  const writeToFile = useCallback(
    async (path: string, content: string, options?: WriteFileOptions) => {
      try {
        await filesystem.writeFileAsync(path, content, options);
        setResults({
          lastOperation: 'writeFileAsync(' + path + ')',
          error: '-',
          data: '-',
        });
      } catch (error: unknown) {
        const message = (error as Error).message;
        if (typeof message === 'string') {
          setResults({
            lastOperation: 'readFileAsync(' + path + ')',
            error: message,
            data: '-',
          });
        }
      }
    },
    [],
  );

  return (
    <div>
      <h2 className={styles.subtitle}>Read/Write to file</h2>
      <p className={styles.property_name}>Result</p>
      <p className={styles.property_name}>
        Last operation: {results.lastOperation}
      </p>
      <p className={styles.property_name}>Error: {results.error}</p>
      <p className={styles.property_name}>Data: {results.data}</p>
      <div className={styles.button_container}>
        <Button
          label="Read file: /tmp/text.txt"
          onClick={() => readFile('/tmp/text.txt')}
        />
        <Button
          label="Read file: /tmp/test/text.txt"
          onClick={() => readFile('/tmp/test/text.txt')}
        />
        <Button
          label="Write to file: /tmp/text.txt"
          onClick={() => writeToFile('/tmp/text.txt', 'Hello world\\n')}
        />
        <Button
          label="Write to file: /tmp/text.txt (append)"
          onClick={() =>
            writeToFile('/tmp/text.txt', 'Hello world\\n', { append: true })
          }
        />
        <Button
          label="Write to file: /tmp/test/text.txt"
          onClick={() => writeToFile('/tmp/test/text.txt', 'Hello world 2')}
        />
      </div>
    </div>
  );
};

export default ReadWrite;
