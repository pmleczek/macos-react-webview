import type { IconName } from "../icon";

export interface SidebarItemEntry {
  iconName: IconName;
  label: string;
  to: string;
}

export interface SidebarItemProps {
  icon: IconName;
  label: string;
  to: string;
}
