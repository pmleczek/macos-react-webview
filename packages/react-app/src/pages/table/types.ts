import type React from "react";

export interface NewItemModalProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}
