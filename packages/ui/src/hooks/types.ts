import type React from 'react';

export interface UseHandleClickOutsideParams {
  onClickOutside: () => void;
  ref: React.RefObject<HTMLElement | null | undefined>;
}
