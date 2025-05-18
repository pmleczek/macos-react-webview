import type React from "react";

export interface SampleItem {
  id: string;
  date: string;
  emoji: string;
  price: string;
}

export interface NewItemModalProps {
  onSuccess: (item: SampleItem) => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}
