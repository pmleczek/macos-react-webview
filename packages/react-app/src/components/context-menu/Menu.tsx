import { useRef } from "react";
import { useAtom } from "jotai";

import { useHandleClickOutside } from "@hooks";
import { contextMenuAtom } from "./atoms";
import styles from "./index.module.css";
import Icon from "../icon";

const Menu = () => {
  const [state, setState] = useAtom(contextMenuAtom);
  const menuRef = useRef<HTMLDivElement>(null);

  useHandleClickOutside({
    ref: menuRef,
    onClickOutside: () => {
      setState(null);
    },
  });

  if (!state) {
    return null;
  }

  const handleClick = (
    handlerFunction?: (() => void) | (() => Promise<void>)
  ) => {
    handlerFunction?.();
    setState(null);
  };

  const hasAnyIcon =
    state.items.find((item) => !!item.icon) != undefined;
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
