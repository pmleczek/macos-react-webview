import { createRouter } from "router";

import type { ParamList } from "./types";

const { Link, Route, Router } = createRouter<ParamList>();

export { Link, ParamList, Route, Router };
