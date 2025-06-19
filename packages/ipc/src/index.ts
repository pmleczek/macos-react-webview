import IPCHandler from './handler';
const ipcHandler = new IPCHandler();
export { ipcHandler };

export { emitOneWayEvent, emitTwoWayEvent } from './emit';
export { default as IPCHandlerProvider } from './IPCHandlerProvider';
