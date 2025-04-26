import { ComponentType, ReactNode } from "react";

export interface RouteEntry {
  component: ComponentType<any>;
  path: string;
}

export interface RouteProps {
  component: ComponentType<any>;
  path: string;
}

export interface RoutingContainerProps {
  children: ReactNode;
  initialRoute: string;
}

export interface NavigationState {
  route: string;
  params: object;
}
