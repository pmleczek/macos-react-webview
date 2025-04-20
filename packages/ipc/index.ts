import { registerGlobalEventListener } from "./src/events";

registerGlobalEventListener();

export { emit } from "./src/emit";
export { on, off } from "./src/events";
