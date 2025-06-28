import { useCallback } from 'react';

import Button from '../button';
import Icon from '../icon';
import styles from './command.module.css';
import type { CommandInputProps } from './types';

const Input = ({ onChange, onHide, value }: CommandInputProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.value);
    },
    [onChange],
  );

  return (
    <div className={styles.input_container}>
      <Icon className={styles.search_icon} name="search" size={18} />
      <input
        className={styles.search_input}
        autoCorrect="off"
        onChange={handleChange}
        placeholder="Search..."
        value={value}
      />
      <Button.Icon
        className={styles.close_icon}
        icon="close"
        hoverBackground={false}
        onClick={onHide}
        iconProps={{
          size: 20,
        }}
      />
    </div>
  );
};

export default Input;
