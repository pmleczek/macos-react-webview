import {
  AppWindowMac,
  Bell,
  ChevronRight,
  Clipboard,
  FolderClosed,
  Home,
  Laptop,
  LoaderCircle,
  MonitorCog,
  Moon,
  MoveLeft,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
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
  clipboard: Clipboard,
  close: X,
  emoji: Smile,
  folder: FolderClosed,
  home: Home,
  laptop: Laptop,
  loader: LoaderCircle,
  monitor_cog: MonitorCog,
  moon: Moon,
  panel_left: PanelLeft,
  plus: Plus,
  search: Search,
  settings: Settings,
  sun: Sun,
  table: Table2,
} as const;

export default icons;

export type IconName = keyof typeof icons;
