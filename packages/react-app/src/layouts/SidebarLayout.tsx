import { fetchSpaces } from '@data/query';
import { modalAtomFamily } from '@state/atoms';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useMemo } from 'react';
import { Sidebar, SidebarItem } from 'ui';

import NewSpaceModal from './NewSpaceModal';
import type { LayoutProps } from './types';
import { sidebarSpaceSection } from './utils';

const NAVIGATION_LINKS: SidebarItem[] = [
  {
    icon: 'home',
    label: 'Home',
    to: '/',
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

const SidebarLayout = ({ children }: LayoutProps) => {
  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });

  const setShowModal = useSetAtom(modalAtomFamily('new-page-modal'));

  const sidebarItems: SidebarItem[] = useMemo(() => {
    return [
      ...NAVIGATION_LINKS,
      sidebarSpaceSection(data ?? [], () => setShowModal(true)),
    ];
  }, [data, setShowModal]);

  return (
    <div className="sidebar-layout-container">
      <Sidebar items={sidebarItems} />
      <div className="sidebar-layout-content-container">{children}</div>
      <NewSpaceModal />
    </div>
  );
};

export default SidebarLayout;
