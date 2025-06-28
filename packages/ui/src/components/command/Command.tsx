import React from 'react';

import Body from './Body';
import styles from './command.module.css';
import Empty from './Empty';
import Footer from './Footer';
import Header from './Header';
import Input from './Input';
import Loader from './Loader';
import type { CommandProps } from './types';

const Command = ({ children, onHide, show }: CommandProps) => {
  if (!show) {
    return null;
  }

  console.log(React.Children.toArray(children));

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
Command.Loader = Loader;

export default Command;
