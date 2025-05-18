import { on } from "./events";

export function emit(type: string, payload?: Object) {
  const message = JSON.stringify({
    type,
    payload,
  });
  window?.webkit?.messageHandlers?.ipc?.postMessage(message);
}

export async function emitWithResponse(
  type: string,
  responseType: string,
  payload?: Object
): Promise<Object> {
  const message = JSON.stringify({
    type,
    payload,
  });
  window?.webkit?.messageHandlers?.ipc?.postMessage(message);

  return new Promise((resolve) => {
    on(responseType, (data: Object) => {
      resolve(data);
    }, { singleUse: true });
  });
}
