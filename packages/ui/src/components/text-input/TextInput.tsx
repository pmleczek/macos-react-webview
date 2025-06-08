import { useCallback } from 'react';

import Label from './Label';
import styles from './textinput.module.css';
import type { TextInputProps } from './types';

const TextInput = ({
  id,
  leftItem,
  onChange,
  placeholder,
  value,
}: TextInputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange],
  );

  if (leftItem) {
    return (
      <div className={styles.input_wrapper}>
        <div className={styles.item_left}>{leftItem}</div>
        <input
          id={id}
          className={styles.text_input}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }

  return (
    <input
      id={id}
      className={styles.text_input}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

TextInput.Label = Label;

export default TextInput;
