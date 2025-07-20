import { useCallback, useState } from 'react';
import { Button, TextInput } from 'ui';

import styles from './data.module.css';
import type { DataExampleProps, ExampleState } from './types';

const DataExample = <T,>({ label, method, input }: DataExampleProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [state, setState] = useState<ExampleState<T>>({});

  const handleAction = useCallback(async () => {
    try {
      if (input) {
        const result = await method(inputValue);
        setState({ data: result });
        setInputValue('');
      } else {
        const result = await method();
        setState({ data: result });
      }
    } catch (error) {
      const message = (error as Error).message;
      if (typeof message === 'string') {
        setState({ error: message });
      }
    }
  }, [input, inputValue, method]);

  return (
    <div className={styles.example}>
      <h2 className={styles.subtitle}>{label}</h2>
      <h2 className={styles.property_name}>
        {label} state: {JSON.stringify(state, null, 2)}
      </h2>
      {input && (
        <TextInput
          className={styles.text_input}
          value={inputValue}
          onChange={setInputValue}
        />
      )}
      <div className={styles.button_container}>
        <Button label={label} onClick={handleAction} />
      </div>
    </div>
  );
};

export default DataExample;
