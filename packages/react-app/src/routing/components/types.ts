import { ComponentType, ReactNode } from "react";

export interface RouteProps {
  component: ComponentType<any>;
  path: string;
}

export interface RoutingContainerProps {
  children: ReactNode;
}
