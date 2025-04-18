export function emit(type: string) {
  window?.webkit?.messageHandlers?.ipc?.postMessage({
    type,
  });
}
