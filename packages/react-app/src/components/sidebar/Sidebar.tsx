import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div id="sidebar-container">
      <SidebarItem label="Home" to="/" />
      <SidebarItem label="Settings" to="/settings" />
    </div>
  );
};

export default Sidebar;
