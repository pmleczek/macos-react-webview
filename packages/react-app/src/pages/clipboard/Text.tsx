import { clipboard } from 'api';
import { useCallback, useState } from 'react';
import { Button, TextInput } from 'ui';

import styles from './clipboard.module.css';

const Text = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [text, setText] = useState<string>('');

  const writeText = useCallback(() => {
    clipboard.writeText(inputValue);
    setInputValue('');
  }, [inputValue]);

  const readText = useCallback(async () => {
    const clipboardText = await clipboard.readText();
    setText(clipboardText);
  }, []);

  return (
    <div>
      <h2 className={styles.subtitle}>General</h2>
      <div className={styles.button_container}>
        <Button label="Clear" onClick={clipboard.clear} />
      </div>
      <h2 className={styles.subtitle}>Text</h2>
      <TextInput
        className={styles.text_input}
        placeholder="Empty"
        onChange={setInputValue}
        value={inputValue}
      />
      <p>
        <span className={styles.property_name}>Clipboard text: </span>
        {text}
      </p>
      <div className={styles.button_container}>
        <Button label="Read text" onClick={readText} />
        <Button label="Write text" onClick={writeText} />
      </div>
    </div>
  );
};

export default Text;
