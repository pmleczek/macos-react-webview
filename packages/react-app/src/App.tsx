import { createHashRouter, RouterProvider } from "react-router";
import "ui/dist/index.css";

import { Menu } from "@components/context-menu";
import { Home, Settings, Space, Table } from "@pages";

const router = createHashRouter([
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
  {
    path: "/spaces/:id",
    Component: Space,
  }
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
