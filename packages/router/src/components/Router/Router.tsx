import type { RouterProps } from "./types";

const Router = <T,>({ children }: RouterProps<T>) => {
  return children;
};

export default Router;
