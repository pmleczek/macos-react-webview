import {
  ChevronRight,
  Home,
  MoveLeft,
  MoveRight,
  Plus,
  Settings,
  Table2,
  X,
} from 'lucide-react';

const icons = {
  arrow_left: MoveLeft,
  arrow_right: MoveRight,
  chevron_right: ChevronRight,
  close: X,
  home: Home,
  plus: Plus,
  settings: Settings,
  table: Table2,
} as const;

export default icons;

export type IconName = keyof typeof icons;
