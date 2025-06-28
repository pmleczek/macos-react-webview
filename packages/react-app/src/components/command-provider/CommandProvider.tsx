import { commandMenuAtom } from '@state/atoms';
import { ipcHandler } from 'ipc';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Command } from 'ui';

import useCommandItems from './useCommandItems';

const CommandProvider = () => {
  const [query, setQuery] = useState<string>('');
  const [showCommand, setShowCommand] = useAtom(commandMenuAtom);

  const items = useCommandItems(query);

  const handleHide = useCallback(() => {
    setShowCommand(false);
    setQuery('');
  }, [setShowCommand]);

  useEffect(() => {
    const searchListener = ipcHandler.register('application:search', () => {
      setShowCommand(true);
    });
    const escapeListener = ipcHandler.register(
      'application:escape',
      handleHide,
    );

    return () => {
      ipcHandler.unregister(searchListener);
      ipcHandler.unregister(escapeListener);
    };
  }, [handleHide, setShowCommand]);

  return (
    <Command show={showCommand} onHide={handleHide}>
      <Command.Input onHide={handleHide} value={query} onChange={setQuery} />
      <Command.Body>Body</Command.Body>
      <Command.Footer />
    </Command>
  );
};

export default CommandProvider;
