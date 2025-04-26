import { Link } from "../../routing";
import type { SidebarItemProps } from "./types";

const SidebarItem = ({ label, selected }: SidebarItemProps) => {
  return (
    <Link to="Settings">
      <div className={`sidebar-item ${selected ? "selected" : ""}`}>
        <span className="sidebar-item-label">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarItem;
