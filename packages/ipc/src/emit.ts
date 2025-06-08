import type IPCHandler from './handler';

const emitEventViaIPC = (type: string, payload?: object) => {
  const message = JSON.stringify({ type, payload });
  window.webkit?.messageHandlers.ipc.postMessage(message);
};

export const emitOneWayEvent = <T extends object | undefined = undefined>(
  event: string,
  data?: T,
): void => {
  emitEventViaIPC(event, data);
};

export const emitTwoWayEvent = <
  T extends object | undefined = undefined,
  U extends object | undefined = undefined,
>(
  event: string,
  data: T,
  ipcHandler: IPCHandler,
): Promise<U> => {
  emitEventViaIPC(event, data);

  return new Promise((resolve) => {
    ipcHandler.register(
      event,
      (data) => {
        resolve(data as U);
      },
      { singleUse: true },
    );
  });
};
