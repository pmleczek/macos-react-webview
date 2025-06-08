import { useCallback, useRef } from "react";
import { useAtom } from "jotai";

import { contextMenuAtom } from "./atoms";
import styles from "./index.module.css";
import { Icon, useHandleClickOutside } from "ui";

const Menu = () => {
  const [state, setState] = useAtom(contextMenuAtom);
  const menuRef = useRef<HTMLDivElement>(null);

  const hideMenu = useCallback(() => {
    state?.onHide?.();
    setState(null);
  }, [state, setState]);

  useHandleClickOutside({
    ref: menuRef,
    onClickOutside: () => {
      hideMenu();
    },
  });

  if (!state) {
    return null;
  }

  const handleClick = (
    handlerFunction?: (() => void) | (() => Promise<void>)
  ) => {
    handlerFunction?.();
    hideMenu();
  };

  const hasAnyIcon = state.items.find((item) => !!item.icon) != undefined;
  const iconPlaceholder = hasAnyIcon ? (
    <span className={styles.icon_placeholder} />
  ) : null;

  return (
    <div
      ref={menuRef}
      className={styles.menu_container}
      style={{
        left: state.x,
        top: state.y,
      }}
    >
      {state.items.map((item) => (
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
