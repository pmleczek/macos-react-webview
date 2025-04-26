import type { RouteProps } from "./types";

const Route = (props: RouteProps) => {
  const RouteComponent = props.component;

  return <RouteComponent />;
};

export default Route;
