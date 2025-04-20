declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        ipc: {
          postMessage: (payload: string) => void;
        };
      };
    };
    __ipcGlobalListenerInitialized: boolean;
  }
}

export default global;
