import {
  IconSettings,
  IconSmartHome,
  IconTable,
  IconX,
} from "@tabler/icons-react";

const icons = {
  close: IconX,
  home: IconSmartHome,
  settings: IconSettings,
  table: IconTable,
} as const;

export default icons;

export type IconName = keyof typeof icons;
