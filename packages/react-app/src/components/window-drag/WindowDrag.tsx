import type { WindowDragProps } from "./types";

const WindowDrag = ({ children }: WindowDragProps) => {
  const handleDoubleClick = () => {
    console.log("WindowDrag:handleDoubleClick");
  };

  const handleDragStart = () => {
    console.log("WindowDrag:handleDragStart");
  };

  const handleDragMove = () => {
    console.log("Window:handleDragMove");
  };

  const handleDragEnd = () => {
    console.log("WindowDrag:handleDragEnd");
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      {children}
    </div>
  );
};

export default WindowDrag;
