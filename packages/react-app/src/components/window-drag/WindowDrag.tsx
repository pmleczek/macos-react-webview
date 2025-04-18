import { useCallback, useRef, useState } from "react";

import type { Coordinates, WindowDragProps } from "./types";

const WindowDrag = ({ children }: WindowDragProps) => {
  const [shouldTrackMovement, setShouldTrackMovement] = useState(false);
  const initialPosition = useRef<Coordinates | null>(null);

  const handleDoubleClick = () => {
    console.log("WindowDrag:handleDoubleClick");
  };

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
        console.log("Start dragging");
      }
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    if (shouldTrackMovement) {
      setShouldTrackMovement(false);
    } else {
      console.log("Stop dragging");
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
