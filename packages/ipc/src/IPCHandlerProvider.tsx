import { useEffect, useRef } from 'react';

import type { IPCHandlerProviderProps } from './types';

const IPCHandlerProvider = ({
  children,
  ipcHandler,
}: IPCHandlerProviderProps) => {
  const handlerRef = useRef(ipcHandler);

  useEffect(() => {
    window.addEventListener('webview-event', handlerRef.current.handleEvent);

    return () => {
      window.removeEventListener(
        'webview-event',
        // eslint-disable-next-line react-hooks/exhaustive-deps
        handlerRef.current.handleEvent,
      );
    };
  }, []);

  return children;
};

export default IPCHandlerProvider;
