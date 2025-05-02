import SidebarItem from "./SidebarItem";
import type { SidebarItemEntry } from "./types";

const sidebarItems: SidebarItemEntry[] = [
  {
    iconName: "home",
    label: "Home",
    to: "/",
  },
  {
    iconName: "settings",
    label: "Settings",
    to: "/settings",
  },
];

const Sidebar = () => {
  return (
    <div id="sidebar-container">
      {sidebarItems.map((sidebarItem: SidebarItemEntry) => (
        <SidebarItem
          icon={sidebarItem.iconName}
          label={sidebarItem.label}
          to={sidebarItem.to}
        />
      ))}
    </div>
  );
};

export default Sidebar;
