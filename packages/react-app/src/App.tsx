import { createBrowserRouter, RouterProvider } from "react-router";

import { Home, Settings, Table } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/table",
    Component: Table,
  },
  {
    path: "/settings",
    Component: Settings,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
