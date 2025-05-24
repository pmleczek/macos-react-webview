import { emit } from 'ipc';
import { useCallback, useRef, useState } from 'react';

import constants from './constants';
import type { DraggableAreaProps } from './types';

const DraggableArea = ({ children, className }: DraggableAreaProps) => {
  const [tracking, setTracking] = useState(false);
  const initialPosition = useRef<number[] | null>(null);

  const handleDoubleClick = useCallback(() => {
    emit(constants.WINDOW_MAXIMIZE);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      initialPosition.current = [event.clientX, event.clientY];
      setTracking(true);
    },
    [],
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!initialPosition.current) {
        return;
      }

      const dx = Math.abs(initialPosition.current[0] - event.clientX);
      const dy = Math.abs(initialPosition.current[1] - event.clientY);

      if (dx > constants.DRAG_THRESHOLD || dy > constants.DRAG_THRESHOLD) {
        setTracking(false);
        emit(constants.WINDOW_START_DRAGGING);
      }
    },
    [],
  );

  const handleMouseUp = useCallback(() => {
    if (tracking) {
      setTracking(false);
    } else {
      emit(constants.WINDOW_STOP_DRAGGING);
    }
  }, [tracking]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={className}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={tracking ? handleMouseMove : undefined}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default DraggableArea;
