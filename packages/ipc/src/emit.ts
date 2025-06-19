import { ipcHandler } from '.';

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
  data?: T,
): Promise<U> => {
  emitEventViaIPC(event, data);

  return new Promise((resolve) => {
    ipcHandler.register(
      event,
      (responseData) => {
        resolve(responseData as U);
      },
      { singleUse: true },
    );
  });
};
