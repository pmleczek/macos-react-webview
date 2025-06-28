import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { commandStateAtom } from './atoms';
import Command from './Command';
import styles from './command.module.css';
import type { CommandBodyProps } from './types';

const Body = ({ children }: CommandBodyProps) => {
  const [commandState, setCommandState] = useAtom(commandStateAtom);
  const itemCount = useRef<number>(0);

  const commandItems = useMemo(() => {
    return React.Children.toArray(children).filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && child.type === Command.Item,
    );
  }, [children]);

  useEffect(() => {
    setCommandState((prev) => (prev ? { ...prev, selectedIndex: -1 } : prev));
  }, [children, setCommandState]);

  const indexedChildren = React.Children.map(children, (child, index) => {
    if (index === 0) {
      itemCount.current = -1;
    }

    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.type === Command.Item) {
      itemCount.current++;
      return React.cloneElement(child, {
        // @ts-expect-error TODO: fix types
        index: itemCount.current,
      });
    }

    return child;
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setCommandState((prev) => {
          if (!prev) {
            return prev;
          }

          const newIndex = Math.max(-1, prev.selectedIndex - 1);
          return { ...prev, selectedIndex: newIndex };
        });
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setCommandState((prev) => {
          if (!prev) {
            return prev;
          }

          const newIndex = Math.min(
            commandItems.length - 1,
            prev.selectedIndex + 1,
          );
          return { ...prev, selectedIndex: newIndex };
        });
      } else if (event.key === 'Enter') {
        event.preventDefault();

        if (commandState?.selectedIndex === undefined) {
          return;
        }

        const selected = commandItems[commandState.selectedIndex];
        // @ts-expect-error TODO: fix types
        const action = selected?.props?.item?.action;

        if (action && typeof action === 'function') {
          action();
          commandState.hide();
        }
      }
    },
    [commandItems, commandState, setCommandState],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (itemCount.current >= 0) {
    itemCount.current++;
  }

  return <div className={styles.body}>{indexedChildren}</div>;
};

export default Body;
