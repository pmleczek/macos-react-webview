import { useEffect, useRef, useState } from "react";
import { on, off } from "ipc";

import { HeaderBar, Sidebar } from "@components";
import { EventType } from "@utils/constants";

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
    <div id="container">
      <HeaderBar />
      <div id="main-container">
        <Sidebar />
        <span>
          Test{" "}
          {showSettings && (
            <span>Settings (CMD + ,) menu item was selected</span>
          )}
        </span>
      </div>
    </div>
  );
};

export default App;
