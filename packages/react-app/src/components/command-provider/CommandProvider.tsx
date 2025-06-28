import { commandMenuAtom } from '@state/atoms';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { Command } from 'ui';

const CommandProvider = () => {
  const [query, setQuery] = useState<string>('');
  const [showCommand, setShowCommand] = useAtom(commandMenuAtom);

  const handleHide = useCallback(() => {
    setShowCommand(false);
    setQuery('');
  }, [setShowCommand]);

  return (
    <Command show={showCommand} onHide={handleHide}>
      <Command.Input onHide={handleHide} value={query} onChange={setQuery} />
      <Command.Body />
      <Command.Footer />
    </Command>
  );
};

export default CommandProvider;
