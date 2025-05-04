import { ContextMenuItem } from "../components/context-menu";

export type ContextMenuState = {
  x: number;
  y: number;
  items: ContextMenuItem[];
} | null;

export type ContextMenuContextType = {
  contextMenuState: ContextMenuState;
  setContextMenuState: React.Dispatch<React.SetStateAction<ContextMenuState>>;
} | null;
