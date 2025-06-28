import { commandMenuAtom } from '@state/atoms';
import { ipcHandler } from 'ipc';
import { useAtom } from 'jotai';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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

  const body: ReactNode = useMemo(() => {
    if (items.empty) {
      return <Command.Empty message="No results found" />;
    }

    if (items.loading) {
      return <Command.Loader />;
    }
  }, [items]);

  return (
    <Command show={showCommand} onHide={handleHide}>
      <Command.Input onHide={handleHide} value={query} onChange={setQuery} />
      <Command.Body>{body}</Command.Body>
      <Command.Footer />
    </Command>
  );
};

export default CommandProvider;
