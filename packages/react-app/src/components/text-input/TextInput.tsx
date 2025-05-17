import { useCallback, useId } from "react";

import type { TextInputProps } from "./types";
import styles from "./index.module.css";

const TextInput = ({
  label,
  maxLength,
  onChange,
  placeholder,
  value,
}: TextInputProps) => {
  const id = useId();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  if (label) {
    return (
      <div>
        <label className={styles.text_input_label} htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          className={styles.text_input}
          maxLength={maxLength}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }

  return (
    <input
      className={styles.text_input}
      maxLength={maxLength}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default TextInput;
