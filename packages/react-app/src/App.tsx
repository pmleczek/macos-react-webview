import { createBrowserRouter, RouterProvider } from "react-router";

import { Menu } from "@components/context-menu";
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
  return (
    <>
      <RouterProvider router={router} />
      <Menu />
    </>
  );
};

export default App;
