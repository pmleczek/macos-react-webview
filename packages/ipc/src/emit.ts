export function emit(type: string, payload?: Object) {
  const message = JSON.stringify({
    type,
    payload,
  });
  window?.webkit?.messageHandlers?.ipc?.postMessage(message);
}
