declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        ipc: {
          postMessage: (payload: string) => void;
        };
      };
    };
  }
}

export default global;
