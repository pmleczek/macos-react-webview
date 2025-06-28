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
import { sidebarSpaceSection } from './utils';

const NAVIGATION_LINKS: SidebarItem[] = [
  {
    icon: 'home',
    label: 'Home',
    to: '/',
  },
  {
    icon: 'app_window',
    label: 'Application',
    to: '/application',
  },
  {
    icon: 'clipboard',
    label: 'Clipboard',
    to: '/clipboard',
  },
  {
    icon: 'bell',
    label: 'Notifications',
    to: '/notifications',
  },
  {
    icon: 'settings',
    label: 'Settings',
    to: '/settings',
  },
  {
    type: 'header',
    label: 'Favorites',
  },
];

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
      ...NAVIGATION_LINKS,
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
