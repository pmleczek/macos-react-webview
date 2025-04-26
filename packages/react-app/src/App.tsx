import { Route, RoutingContainer } from "./routing";
import { Home, Settings } from "@pages";

const App = () => {
  return (
    <RoutingContainer initialRoute="/">
      <Route path="/" component={Home} />
      <Route path="/settings" component={Settings} />
    </RoutingContainer>
  );
};

export default App;
