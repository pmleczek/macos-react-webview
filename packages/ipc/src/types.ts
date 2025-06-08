import type { ReactNode } from 'react';

import type IPCHandler from './handler';

export interface IPCEvent {
  type: string;
  payload: string;
}

export type ListenerCallback = (data: object) => void;

export interface ListenerOptions {
  singleUse?: boolean;
}

export interface Listener {
  callback: ListenerCallback;
  options: ListenerOptions;
}

export interface IPCHandlerProviderProps {
  children?: ReactNode;
  ipcHandler: IPCHandler;
}
