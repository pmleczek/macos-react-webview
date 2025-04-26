import type React from "react";

export interface RouteProps<T> {
  // TODO: replace with a proper type
  component: React.ComponentType<any>;
  name: keyof T;
}