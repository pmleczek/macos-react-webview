import { HeaderBar } from "@components";
import { SidebarLayout } from "@layouts";
import { Route, RoutingContainer } from "./routing";

const App = () => {
  return (
    <RoutingContainer>
      <Route path="/" component={SidebarLayout} />
      <div id="container">
        <HeaderBar />
      </div>
    </RoutingContainer>
  );
};

export default App;
