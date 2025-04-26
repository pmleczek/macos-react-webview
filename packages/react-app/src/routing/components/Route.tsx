import { useRoute } from "../hooks";
import type { RouteProps } from "./types";

const Route = (props: RouteProps) => {
  const route = useRoute();

  if (route != props.path) {
    return null;
  }

  const RouteComponent = props.component;

  return <RouteComponent />;
};

export default Route;
