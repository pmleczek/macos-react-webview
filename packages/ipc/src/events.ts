import type { EventDetails } from "./types";

interface ListenerMapEntry {
  singleUse: boolean;
  callback: (payload: Object) => void;
}

interface ListenerOptions {
  singleUse?: boolean;
}

const listenerMap: { [eventType: string]: ListenerMapEntry[] } = {};

export function on(
  eventType: string,
  callback: (payload: Object) => void,
  options?: ListenerOptions
): string {
  const listenerEntry: ListenerMapEntry = {
    callback,
    singleUse: options?.singleUse ?? false,
  };

  if (eventType in listenerMap) {
    listenerMap[eventType].push(listenerEntry);
    return `${eventType}_${listenerMap[eventType].length - 1}`;
  } else {
    listenerMap[eventType] = [listenerEntry];
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
    listenerMap[event.detail.type].forEach((entry) =>
      entry.callback(event.detail?.payload ?? {})
    );
    listenerMap[event.detail.type] = listenerMap[event.detail.type].filter(
      (entry) => !entry.singleUse
    );
  }
}

export function registerGlobalEventListener() {
  if (!window.__ipcGlobalListenerInitialized) {
    window.__ipcGlobalListenerInitialized = true;
    window.addEventListener("webview-event", handleEvent);
  }
}
