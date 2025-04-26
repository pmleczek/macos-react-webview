import type React from "react";
import type { NavigationState } from "../components/types";

export type NavigationStateContextType = null | {
  state: NavigationState;
  updateState: React.Dispatch<React.SetStateAction<NavigationState>>;
};
