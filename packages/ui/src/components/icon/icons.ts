import { Home, MoveLeft, MoveRight, Settings, Table2, X } from 'lucide-react';

const icons = {
  arrow_left: MoveLeft,
  arrow_right: MoveRight,
  close: X,
  home: Home,
  settings: Settings,
  table: Table2,
} as const;

export default icons;

export type IconName = keyof typeof icons;
