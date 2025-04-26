import type { ReactNode } from "react";

export interface LinkProps<T> {
  children: ReactNode;
  to: keyof T;
}
