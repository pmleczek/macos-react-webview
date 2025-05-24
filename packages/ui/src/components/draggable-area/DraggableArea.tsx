import { EventType } from '@utils/constants';
import { emit } from 'ipc';
import { useCallback, useRef, useState } from 'react';

import type { Coordinates, WindowDragProps } from './types';

const DRAG_THRESHOLD = 5;

const DraggableArea = ({ children }: WindowDragProps) => {
  const [shouldTrackMovement, setShouldTrackMovement] = useState(false);
  const initialPosition = useRef<Coordinates | null>(null);

  const handleDoubleClick = useCallback(() => {
    emit(EventType.WINDOW_MAXIMIZE);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;
      initialPosition.current = { x: clientX, y: clientY };
      setShouldTrackMovement(true);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;
      if (
        initialPosition.current &&
        (Math.abs(initialPosition.current.x - clientX) > DRAG_THRESHOLD ||
          Math.abs(initialPosition.current.y - clientY) > DRAG_THRESHOLD)
      ) {
        setShouldTrackMovement(false);
        emit(EventType.WINDOW_START_DRAGGING);
      }
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    if (shouldTrackMovement) {
      setShouldTrackMovement(false);
    } else {
      emit(EventType.WINDOW_STOP_DRAGGING);
    }
  }, [shouldTrackMovement]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={shouldTrackMovement ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default DraggableArea;
