import { useCallback, useEffect } from "react";

import type { UseHandleClickOutsideParams } from "./types";

const useHandleClickOutside = ({
  onClickOutside,
  ref,
}: UseHandleClickOutsideParams) => {
  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    },
    [onClickOutside, ref]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);
};

export default useHandleClickOutside;
