import React, { useEffect, useState } from "react";

import type {
  NavigationState,
  RouteEntry,
  RoutingContainerProps,
} from "./types";
import { NavigationStateContext } from "../contexts";

const isValidRouteEntry = (props: unknown): props is RouteEntry => {
  if (props && typeof props === "object") {
    return "path" in props && "component" in props;
  }

  return false;
};

const RoutingContainer = ({
  children,
  initialRoute,
}: RoutingContainerProps) => {
  const [routes, setRoutes] = useState<RouteEntry[]>([]);
  const [navigationState, setNavigationState] = useState<NavigationState>({
    route: initialRoute,
    params: {},
  });

  useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    const routeEntries: RouteEntry[] = [];

    for (const child of childrenArray) {
      if (React.isValidElement(child) && typeof child.type === "function") {
        if (child.type.name === "Route" && isValidRouteEntry(child.props)) {
          routeEntries.push(child.props);
        }
      }
    }

    setRoutes(routeEntries);
  }, [children]);

  console.log(routes);

  return (
    <NavigationStateContext.Provider value={{
      state: navigationState,
      updateState: setNavigationState,
    }}>
      {children}
    </NavigationStateContext.Provider>
  );
};

export default RoutingContainer;
