import cs from 'classnames';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

import Icon from '../icon';
import { commandStateAtom } from './atoms';
import styles from './command.module.css';
import type { CommandItemProps } from './types';

const Item = ({ index, item }: CommandItemProps) => {
  const [commandState, setCommandState] = useAtom(commandStateAtom);
  const selected = index !== undefined && commandState?.selectedIndex === index;

  const handleClick = useCallback(() => {
    item.action();
    commandState?.hide();
  }, [item, commandState]);

  const handleMouseEnter = useCallback(() => {
    setCommandState((prev) =>
      prev ? { ...prev, selectedIndex: index ?? -1 } : prev,
    );
  }, [index, setCommandState]);

  const handleMouseLeave = useCallback(() => {
    if (commandState && commandState.selectedIndex === index) {
      setCommandState((prev) => (prev ? { ...prev, selectedIndex: -1 } : prev));
    }
  }, [commandState, index, setCommandState]);

  return (
    <button
      className={cs(styles.item, selected && styles.selected)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
      onClick={handleClick}
    >
      {item.icon && <Icon name={item.icon} size={16} />}
      {item.label}
    </button>
  );
};

export default Item;
