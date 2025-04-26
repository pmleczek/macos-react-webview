import { Link, Route, Router } from "./components";

const createRouter = <T,>() => {
  return {
    Link: Link<T>,
    Route: Route<T>,
    Router: Router<T>,
  };
};

export default createRouter;
