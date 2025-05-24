import { Home, Settings, Table2, X } from 'lucide-react';

const icons = {
  close: X,
  home: Home,
  settings: Settings,
  table: Table2,
} as const;

export default icons;

export type IconName = keyof typeof icons;
