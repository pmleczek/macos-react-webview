import { useEffect } from 'react';

import { throttle, updateDragExclusionZones } from './drag';
import type { NativeDragProviderProps } from './types';

const throttledUpdate = throttle(() => {
  requestAnimationFrame(updateDragExclusionZones);
}, 200);

const attachSidebarTransitionListener = () => {
  const sidebarElement = document.querySelector('.sidebar_container');
  if (!sidebarElement) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const existing = (sidebarElement as any).__hasZoneListener;
  if (existing) return;

  sidebarElement.addEventListener('transitionend', (e: Event) => {
    if (e instanceof TransitionEvent && e.propertyName === 'width') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updateDragExclusionZones();
        });
      });
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (sidebarElement as any).__hasZoneListener = true;
};

const NativeDragProvider = ({ children }: NativeDragProviderProps) => {
  useEffect(() => {
    throttledUpdate();

    const mutationObserver = new MutationObserver(() => {
      throttledUpdate();
      attachSidebarTransitionListener();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      throttledUpdate();
      attachSidebarTransitionListener();
    });

    resizeObserver.observe(document.body);

    window.addEventListener('resize', throttledUpdate);
    window.addEventListener('load', throttledUpdate);
    window.addEventListener('hashchange', throttledUpdate);

    attachSidebarTransitionListener();

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('resize', throttledUpdate);
      window.removeEventListener('load', throttledUpdate);
      window.removeEventListener('hashchange', throttledUpdate);
    };
  }, []);

  return children;
};

export default NativeDragProvider;
