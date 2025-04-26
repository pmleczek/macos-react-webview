import { Sidebar } from "@components";
import type { LayoutProps } from "./types";

const SidebarLayout = ({ children }: LayoutProps) => {
  return (
    <div className="sidebar-layout-container">
      <Sidebar />
      <div className="sidebar-layout-content-container">{children}</div>
    </div>
  );
};

export default SidebarLayout;
