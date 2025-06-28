import { emitOneWayEvent } from 'ipc';

import { ApplicationEvent } from '../events';
import type { ExclusionZone, UpdateExclusionZonesRequest } from './types';

export const getDragExclusionZones = (): ExclusionZone[] => {
  const elements = document.querySelectorAll('[data-drag="none"]');

  const exclusionZones = Array.from(elements).map((element) => {
    const boundingRect = element.getBoundingClientRect();
    return {
      x: boundingRect.left,
      y: boundingRect.top,
      width: boundingRect.width,
      height: boundingRect.height,
    };
  });

  return exclusionZones;
};

export const updateDragExclusionZones = (): void => {
  const exclusionZones = getDragExclusionZones();
  // drawDragExclusionZones(exclusionZones);
  emitOneWayEvent<UpdateExclusionZonesRequest>(
    ApplicationEvent.UpdateExclusionZones,
    { exclusionZones },
  );
};

export const throttle = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): T => {
  let lastCall = 0;
  return function (this: unknown, ...args: unknown[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
    }
  } as T;
};

// const drawDragExclusionZones = (
//   zones: { x: number; y: number; width: number; height: number }[],
// ) => {
//   document.querySelectorAll('.debug-drag-zone').forEach((el) => el.remove());

//   zones.forEach((zone, index) => {
//     const el = document.createElement('div');
//     el.className = 'debug-drag-zone';
//     el.style.position = 'absolute';
//     el.style.left = `${zone.x}px`;
//     el.style.top = `${zone.y}px`;
//     el.style.width = `${zone.width}px`;
//     el.style.height = `${zone.height}px`;
//     el.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
//     el.style.pointerEvents = 'none';
//     el.style.zIndex = '9999';

//     el.setAttribute('data-debug-index', `${index}`);
//     document.body.appendChild(el);
//   });
// };
