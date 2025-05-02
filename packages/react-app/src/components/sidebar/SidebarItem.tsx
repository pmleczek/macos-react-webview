import { NavLink } from "react-router";

import type { SidebarItemProps } from "./types";
import Icon from "../icon";

const SidebarItem = ({ icon, label, to }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-item ${isActive ? "selected" : ""}`}
    >
      <Icon name={icon} size={18} />
      <span className="sidebar-item-label">{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
