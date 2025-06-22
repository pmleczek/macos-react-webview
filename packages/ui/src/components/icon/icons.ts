import {
  AppWindowMac,
  Bell,
  ChevronRight,
  Home,
  Laptop,
  Moon,
  MoveLeft,
  MoveRight,
  Plus,
  Settings,
  Smile,
  Sun,
  Table2,
  X,
} from 'lucide-react';

const icons = {
  app_window: AppWindowMac,
  arrow_left: MoveLeft,
  arrow_right: MoveRight,
  bell: Bell,
  chevron_right: ChevronRight,
  close: X,
  emoji: Smile,
  home: Home,
  laptop: Laptop,
  moon: Moon,
  plus: Plus,
  settings: Settings,
  sun: Sun,
  table: Table2,
} as const;

export default icons;

export type IconName = keyof typeof icons;
