import { emitOneWayEvent } from 'ipc';

import { ApplicationEvent } from '../events';

export const hide = (): void => {
  emitOneWayEvent(ApplicationEvent.Hide);
};

export const show = (): void => {
  emitOneWayEvent(ApplicationEvent.Show);
};

export const quit = (): void => {
  emitOneWayEvent(ApplicationEvent.Quit);
};
