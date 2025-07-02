import type { WriteFileOptions } from 'api';
import { filesystem } from 'api';
import { useCallback, useState } from 'react';
import { Button } from 'ui';

import styles from './filesystem.module.css';

interface FileData {
  lastOperation: string;
  data: string;
  error: string;
}

const FSOperations = () => {
  const [results, setResults] = useState<FileData>({
    lastOperation: '-',
    data: '-',
    error: '-',
  });
  const [directoryContent, setDirectoryContent] = useState<string[]>([]);
  const [mkdirResponse, setMkdirResponse] = useState<string>('');

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
      <Button
        label="Read directory: /tmp/test"
        onClick={() => readDirectory('/tmp/test')}
      />

      <h2 className={styles.subtitle}>Create/delete/get info</h2>
    </div>
  );
};

export default FSOperations;
