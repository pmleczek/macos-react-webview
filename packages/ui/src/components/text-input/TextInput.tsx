import cs from 'classnames';
import { useCallback } from 'react';

import Label from './Label';
import styles from './textinput.module.css';
import type { TextInputProps } from './types';

const TextInput = ({
  autoCorrect,
  className,
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

  const autoCorrectValue = autoCorrect ? '' : 'off';

  if (leftItem) {
    return (
      <div className={styles.input_wrapper}>
        <div className={styles.item_left}>{leftItem}</div>
        <input
          autoCorrect={autoCorrectValue}
          id={id}
          className={cs(styles.text_input, className)}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }

  return (
    <input
      autoCorrect={autoCorrectValue}
      id={id}
      className={cs(styles.text_input, className)}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

TextInput.Label = Label;

export default TextInput;
