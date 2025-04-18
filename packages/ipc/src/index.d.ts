declare global {
  interface Window {
    webkit?: {
      messageHandlers: {
        ipc: {
          postMessage: (payload: Object) => void;
        };
      };
    };
  }
}

export default global;
