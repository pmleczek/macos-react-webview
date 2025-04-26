import React from "react";

import type { RoutingContainerProps } from "./types";

const RoutingContainer = ({ children }: RoutingContainerProps) => {
  console.log(React.Children.toArray(children));

  return children;
};

export default RoutingContainer;
