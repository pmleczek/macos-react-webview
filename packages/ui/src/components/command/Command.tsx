import React from 'react';

import Body from './Body';
import styles from './command.module.css';
import Footer from './Footer';
import Input from './Input';
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
Command.Footer = Footer;
Command.Input = Input;

export default Command;
