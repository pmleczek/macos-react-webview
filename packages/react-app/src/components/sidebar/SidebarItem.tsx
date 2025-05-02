import { NavLink } from "react-router";

import type { SidebarItemProps } from "./types";

const SidebarItem = ({ label, to }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `sidebar-item ${isActive ? "selected" : ""}`}
    >
      <span className="sidebar-item-label">{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
