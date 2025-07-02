import { commandMenuAtom } from '@state/atoms';
import { ipcHandler } from 'ipc';
import { useAtom } from 'jotai';
import {
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Command } from 'ui';

import useCommandItems from './useCommandItems';

const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): T => {
  let timer: ReturnType<typeof setTimeout> | undefined;

  return function (this: unknown, ...args: unknown[]) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
};

const CommandProvider = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [showCommand, setShowCommand] = useAtom(commandMenuAtom);

  const items = useCommandItems(query);

  const handleHide = useCallback(() => {
    setShowCommand(false);
    setQuery('');
    setInputValue('');
  }, [setShowCommand]);

  const debouncedUpdateQuery = useMemo(() => {
    return debounce((value: string) => setQuery(value), 250);
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedUpdateQuery(value);
    },
    [debouncedUpdateQuery],
  );

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

    const children: ReactElement[] = [];

    if (items.quickActions.length > 0) {
      children.push(<Command.Header label="Quick Actions" />);
      children.push(
        ...items.quickActions.map((item) => (
          <Command.Item key={item.label} item={item} />
        )),
      );
    }

    if (items.navigation.length > 0) {
      children.push(<Command.Header label="Navigation" />);
      children.push(
        ...items.navigation.map((item) => (
          <Command.Item key={item.label} item={item} />
        )),
      );
    }

    return children;
  }, [items]);

  return (
    <Command show={showCommand} onHide={handleHide}>
      <Command.Input
        onHide={handleHide}
        value={inputValue}
        onChange={handleChange}
      />
      <Command.Body>{body}</Command.Body>
      <Command.Footer />
    </Command>
  );
};

export default CommandProvider;
