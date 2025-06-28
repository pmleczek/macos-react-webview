import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { commandStateAtom } from './atoms';
import Body from './Body';
import styles from './command.module.css';
import Empty from './Empty';
import Footer from './Footer';
import Header from './Header';
import Input from './Input';
import Item from './Item';
import Loader from './Loader';
import type { CommandProps } from './types';

const Command = ({ children, onHide, show }: CommandProps) => {
  const setCommandState = useSetAtom(commandStateAtom);

  useEffect(() => {
    setCommandState({
      hide: onHide,
      selectedIndex: -1,
    });
  }, [onHide, setCommandState]);

  useEffect(() => {
    if (!show) {
      setCommandState((prev) =>
        prev
          ? {
              ...prev,
              selectedIndex: -1,
            }
          : prev,
      );
    }
  }, [show, setCommandState]);

  if (!show) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles.overlay} onClick={onHide}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Command.Body = Body;
Command.Empty = Empty;
Command.Footer = Footer;
Command.Header = Header;
Command.Input = Input;
Command.Item = Item;
Command.Loader = Loader;

export default Command;
