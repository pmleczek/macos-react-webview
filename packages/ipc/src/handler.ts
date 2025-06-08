import type {
  IPCEvent,
  Listener,
  ListenerCallback,
  ListenerOptions,
} from './types';

class IPCHandler {
  private listenerMap = new Map<string, Listener[]>();

  register(
    event: string,
    callback: ListenerCallback,
    options: ListenerOptions = {},
  ): string {
    const listener: Listener = {
      callback,
      options,
    };

    const listeners = this.listenerMap.get(event) ?? [];
    listeners.push(listener);
    this.listenerMap.set(event, listeners);

    return `${event}_${listeners.length - 1}`;
  }

  unregister(listenerKey: string) {
    const [event, indexStr] = listenerKey.split('_');
    const index = parseInt(indexStr, 10);

    if (!isNaN(index)) {
      const listeners = this.listenerMap.get(event) ?? [];
      if (index < listeners.length) {
        listeners.splice(index, 1);

        if (listeners.length === 0) {
          this.listenerMap.delete(event);
        }
      }
    }
  }

  handleEvent = (event: CustomEventInit<IPCEvent>) => {
    if (event.detail?.type && event.detail.payload) {
      const listeners = this.listenerMap.get(event.detail.type) ?? [];
      listeners.forEach((listener: Listener) => {
        listener.callback(JSON.parse(event.detail?.payload ?? '{}'));
      });

      const filtered = listeners.filter(
        (listener: Listener) => !listener.options.singleUse,
      );
      if (filtered.length === 0) {
        this.listenerMap.delete(event.detail.type);
      } else {
        this.listenerMap.set(event.detail.type, filtered);
      }
    }
  };
}

export default IPCHandler;
