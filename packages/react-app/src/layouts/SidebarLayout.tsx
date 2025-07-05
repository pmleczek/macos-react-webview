import { CommandProvider } from '@components';
import { commandMenuAtom, hideSidebarAtom } from '@state/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { Outlet } from 'react-router';
import { Sidebar, SidebarItem } from 'ui';

import { navigationLinks } from './utils';

const SidebarLayout = () => {
  const hideSidebar = useAtomValue(hideSidebarAtom);
  const setShowCommand = useSetAtom(commandMenuAtom);

  const sidebarItems: SidebarItem[] = useMemo(() => {
    return navigationLinks;
  }, []);

  return (
    <div className="sidebar-layout-container">
      <Sidebar
        hide={hideSidebar}
        items={sidebarItems}
        search
        onToggleSearch={() => setShowCommand(true)}
      />
      <div className="sidebar-layout-content-container">
        <Outlet />
      </div>
      <CommandProvider />
    </div>
  );
};

export default SidebarLayout;
