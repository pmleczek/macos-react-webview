import { Sidebar } from "@components";
import type { SidebarLayoutProps } from "./types";

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <div className="sidebar-layout-container">
      <Sidebar />
      <div className="sidebar-layout-content-container">{children}</div>
    </div>
  );
};

export default SidebarLayout;
