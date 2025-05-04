import { useContext } from "react";

import { ContextMenuContext } from "../../contexts";
import styles from "./index.module.css";
import Icon from "../icon";

const Menu = () => {
  const context = useContext(ContextMenuContext);

  if (!context || !context.contextMenuState) {
    return null;
  }

  const { contextMenuState, setContextMenuState } = context;

  const handleClick = (
    handlerFunction?: (() => void) | (() => Promise<void>)
  ) => {
    handlerFunction?.();
    setContextMenuState(null);
  };

  const hasAnyIcon =
    contextMenuState.items.find((item) => !!item.icon) != undefined;
  const iconPlaceholder = hasAnyIcon ? (
    <span className={styles.icon_placeholder} />
  ) : null;

  return (
    <div
      className={styles.menu_container}
      style={{
        left: contextMenuState.x,
        top: contextMenuState.y,
      }}
    >
      {contextMenuState.items.map((item) => (
        <button
          onClick={() => handleClick(item.handler)}
          className={styles.menu_item}
          type="button"
        >
          {item.icon ? <Icon name={item.icon} /> : iconPlaceholder}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Menu;
