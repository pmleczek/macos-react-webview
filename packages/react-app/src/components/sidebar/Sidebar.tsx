import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <SidebarItem label="Home" selected />
      <SidebarItem label="Settings" />
    </div>
  );
};

export default Sidebar;
