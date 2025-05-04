import { createBrowserRouter, RouterProvider } from "react-router";

import { ContextMenu } from "@components";
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
    <ContextMenu.Provider>
      <RouterProvider router={router} />
    </ContextMenu.Provider>
  );
};

export default App;
