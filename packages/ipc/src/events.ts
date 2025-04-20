import type { EventDetails } from "./types";

const listenerMap: { [eventType: string]: ((payload: Object) => void)[] } = {};

export function on(
  eventType: string,
  callback: (payload: Object) => void
): string {
  if (eventType in listenerMap) {
    listenerMap[eventType].push(callback);
    return `${eventType}_${listenerMap[eventType].length - 1}`;
  } else {
    listenerMap[eventType] = [callback];
    return `${eventType}_0`;
  }
}

export function off(listenerId: string) {
  const split = listenerId.split("_");
  if (split.length == 2 && split[0] in listenerMap) {
    const eventType = split[0];
    const index = Number(split[1]);
    listenerMap[eventType] = [
      ...listenerMap[eventType].slice(0, index),
      ...listenerMap[eventType].slice(index + 1),
    ];

    if (listenerMap[eventType].length === 0) {
      delete listenerMap[eventType];
    }
  }
}

function handleEvent(event: CustomEventInit<EventDetails>) {
  if (event.detail?.type && event.detail.type in listenerMap) {
    listenerMap[event.detail.type].forEach((listener) =>
      listener(event.detail?.payload ?? {})
    );
  }
}

export function registerGlobalEventListener() {
  if (!window.__ipcGlobalListenerInitialized) {
    window.__ipcGlobalListenerInitialized = true;
    window.addEventListener("webview-event", handleEvent);
  }
}
