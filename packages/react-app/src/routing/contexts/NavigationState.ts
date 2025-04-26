import { createContext } from "react";

import type { NavigationStateContextType } from "./types";

const NavigationStateContext = createContext<NavigationStateContextType>(null);

export default NavigationStateContext;
