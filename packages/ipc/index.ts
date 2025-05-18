import { registerGlobalEventListener } from "./src/events";

registerGlobalEventListener();

export { emit, emitWithResponse } from "./src/emit";
export { on, off } from "./src/events";
