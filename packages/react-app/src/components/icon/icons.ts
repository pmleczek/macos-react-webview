import { IconSettings, IconSmartHome } from "@tabler/icons-react";

const icons = {
  home: IconSmartHome,
  settings: IconSettings,
} as const;

export default icons;

export type IconName = keyof typeof icons;
