import React, { useEffect, useState } from "react";

import type { RouteEntry, RoutingContainerProps } from "./types";

const isValidRouteEntry = (props: unknown): props is RouteEntry => {
  if (props && typeof props === "object") {
    return "path" in props && "component" in props;
  }

  return false;
};

const RoutingContainer = ({ children }: RoutingContainerProps) => {
  const [routes, setRoutes] = useState<RouteEntry[]>([]);

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

  return children;
};

export default RoutingContainer;
