import type { DialogOptions, SaveDialogOptions } from 'api';
import { filesystem } from 'api';
import { useCallback, useState } from 'react';
import { Button } from 'ui';

import styles from './filesystem.module.css';
import { DialogExample } from './types';
import { dialogExamples, saveDialogExamples } from './utils';

const Dialog = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [saveFile, setSaveFile] = useState<string>('');

  const openDialog = useCallback(async (options?: DialogOptions) => {
    setSelectedFiles(await filesystem.openDialog(options));
  }, []);

  const openSaveDialog = useCallback(async (options?: SaveDialogOptions) => {
    setSaveFile(await filesystem.openSaveDialog(options));
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>Dialog</h2>
      <p>
        <span className={styles.property_name}>
          Selected files/directories:{' '}
        </span>
      </p>
      <ul>
        {selectedFiles.map((file: string) => (
          <li key={file}>{file}</li>
        ))}
      </ul>
      <div className={styles.button_container}>
        {dialogExamples.map((example: DialogExample) => (
          <Button
            key={example.label}
            label={example.label}
            onClick={() => openDialog(example.config)}
          />
        ))}
      </div>
      <h2 className={styles.subtitle}>Save dialog</h2>
      <span className={styles.property_name}>
        Selected save file: {saveFile}
      </span>
      <div className={styles.button_container}>
        {saveDialogExamples.map((example) => (
          <Button
            key={example.label}
            label={example.label}
            onClick={() => openSaveDialog(example.config)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dialog;
