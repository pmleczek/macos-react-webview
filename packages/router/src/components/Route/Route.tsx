import type { RouteProps } from "./types";

const Route = <T,>({ component, name }: RouteProps<T>) => {
  const RouteComponent = component;

  return <RouteComponent />;
};

export default Route;
