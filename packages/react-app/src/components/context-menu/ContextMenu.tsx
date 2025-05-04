import React, { useCallback, useContext } from "react";

import type { ContextMenuProps } from "./types";
import ContextMenuProvider from "./Provider";
import { ContextMenuContext } from "../../contexts";

const ContextMenu = ({ as, children, className, items }: ContextMenuProps) => {
  const context = useContext(ContextMenuContext);

  const handleContextMenu = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      context?.setContextMenuState({
        x: event.pageX,
        y: event.pageY,
        items,
      });
    },
    [context, items]
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

ContextMenu.Provider = ContextMenuProvider;

export default ContextMenu;
