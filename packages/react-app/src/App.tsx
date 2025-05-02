import { createBrowserRouter, RouterProvider } from "react-router";

import { Home, Settings } from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
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
