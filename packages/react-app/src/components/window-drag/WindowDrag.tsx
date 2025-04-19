import { useCallback, useRef, useState } from "react";
import { emit } from "ipc";

import { EventType } from "@utils/constants";
import type { Coordinates, WindowDragProps } from "./types";

const WindowDrag = ({ children }: WindowDragProps) => {
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
    []
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;
      if (
        initialPosition.current &&
        // TODO: Move to a constant
        (Math.abs(initialPosition.current.x - clientX) > 5 ||
          Math.abs(initialPosition.current.y - clientY) > 5)
      ) {
        setShouldTrackMovement(false);
        emit(EventType.WINDOW_START_DRAGGING);
      }
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    if (shouldTrackMovement) {
      setShouldTrackMovement(false);
    } else {
      emit(EventType.WINDOW_STOP_DRAGGING);
    }
  }, [shouldTrackMovement]);

  return (
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

export default WindowDrag;
