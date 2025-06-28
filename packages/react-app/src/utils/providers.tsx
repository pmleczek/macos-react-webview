import { queryClient } from '@data';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeDragProvider } from 'api';
import { ipcHandler, IPCHandlerProvider } from 'ipc';
import type { FC, ReactNode } from 'react';

interface ProviderProps {
  children?: ReactNode;
}

const composeProviders = (providers: FC<ProviderProps>[]) => {
  return providers.reduce(
    (Previous, Current) =>
      ({ children }: ProviderProps) => {
        if (!Previous) {
          return <Current>{children}</Current>;
        }

        return (
          <Previous>
            <Current>{children}</Current>
          </Previous>
        );
      },
  );
};

const IPCProvider = ({ children }: ProviderProps) => {
  return (
    <IPCHandlerProvider ipcHandler={ipcHandler}>{children}</IPCHandlerProvider>
  );
};

const ReactQueryProvider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const RootProvider = composeProviders([
  IPCProvider,
  ReactQueryProvider,
  NativeDragProvider,
]);

export default RootProvider;
