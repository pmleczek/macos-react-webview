import { Route, Router } from "./routing";
import { Home, Settings } from "@pages";

const App = () => {
  return (
    <Router>
      <Route name="Home" component={Home} />
      <Route name="Settings" component={Settings} />
    </Router>
  );
};

export default App;
