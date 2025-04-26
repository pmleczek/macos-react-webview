import type { SidebarItemProps } from "./types";

const SidebarItem = ({ label, selected }: SidebarItemProps) => {
  return (
    <div className={`sidebar-item ${selected ? "selected" : ""}`}>
      <span className="sidebar-item-label">{label}</span>
    </div>
  );
};

export default SidebarItem;
