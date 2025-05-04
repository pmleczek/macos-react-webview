import { useState } from "react";

import { ContextMenuContext } from "../../contexts";
import type { ContextMenuState } from "../../contexts/types";
import type { ContextMenuProviderProps } from "./types";
import Menu from "./Menu";

const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const [state, setState] = useState<ContextMenuState>(null);

  return (
    <ContextMenuContext.Provider
      value={{ contextMenuState: state, setContextMenuState: setState }}
    >
      {children}
      <Menu />
    </ContextMenuContext.Provider>
  );
};

export default ContextMenuProvider;
