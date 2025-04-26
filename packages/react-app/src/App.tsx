import { useEffect, useRef, useState } from "react";
import { on, off } from "ipc";

import { HeaderBar } from "@components";
import { SidebarLayout } from "@layouts";
import { EventType } from "@utils/constants";
import { Route, RoutingContainer } from "./routing";

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  const listenerRef = useRef<string>(null);

  useEffect(() => {
    listenerRef.current = on(EventType.MENU_ITEM_SETTINGS, () => {
      setShowSettings(true);
    });

    return () => {
      if (listenerRef.current) {
        off(listenerRef.current);
        listenerRef.current = null;
      }
    };
  }, []);

  return (
    <RoutingContainer>
      <Route path="/" component={SidebarLayout} />
      <div id="container">
        <HeaderBar />
        <SidebarLayout>
          <span>
            Test{" "}
            {showSettings && (
              <span>Settings (CMD + ,) menu item was selected</span>
            )}
          </span>
        </SidebarLayout>
      </div>
    </RoutingContainer>
  );
};

export default App;
