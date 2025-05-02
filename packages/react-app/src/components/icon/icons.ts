import { IconSettings, IconSmartHome, IconTable } from "@tabler/icons-react";

const icons = {
  home: IconSmartHome,
  settings: IconSettings,
  table: IconTable,
} as const;

export default icons;

export type IconName = keyof typeof icons;
