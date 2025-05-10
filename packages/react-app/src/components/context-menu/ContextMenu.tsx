import React, { useCallback } from "react";
import { useSetAtom } from "jotai";

import { contextMenuAtom } from "./atoms";
import type { ContextMenuProps } from "./types";

const ContextMenu = ({
  as,
  children,
  className,
  items,
  onContextMenu,
  onContextMenuHide,
}: ContextMenuProps) => {
  const setContextMenuState = useSetAtom(contextMenuAtom);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setContextMenuState({
        x: event.pageX,
        y: event.pageY,
        items,
        onHide: onContextMenuHide,
      });
      onContextMenu?.();
    },
    [items, onContextMenu, onContextMenuHide, setContextMenuState]
  );

  if (as) {
    const Component = as;
    return (
      <Component className={className} onContextMenu={handleContextMenu}>
        {children}
      </Component>
    );
  }

  return (
    <div className={className} onContextMenu={handleContextMenu}>
      {children}
    </div>
  );
};

export default ContextMenu;
