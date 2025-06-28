import { CommandProvider } from '@components';
import { fetchSpaces } from '@data/query';
import {
  commandMenuAtom,
  hideSidebarAtom,
  modalAtomFamily,
} from '@state/atoms';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { Outlet } from 'react-router';
import { Sidebar, SidebarItem } from 'ui';

import NewSpaceModal from './NewSpaceModal';
import { navigationLinks, sidebarSpaceSection } from './utils';

const SidebarLayout = () => {
  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });

  const hideSidebar = useAtomValue(hideSidebarAtom);
  const setShowModal = useSetAtom(modalAtomFamily('new-page-modal'));
  const setShowCommand = useSetAtom(commandMenuAtom);

  const sidebarItems: SidebarItem[] = useMemo(() => {
    return [
      ...navigationLinks,
      sidebarSpaceSection(data ?? [], () => setShowModal(true)),
    ];
  }, [data, setShowModal]);

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
      <NewSpaceModal />
      <CommandProvider />
    </div>
  );
};

export default SidebarLayout;
