import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import type { CommandItem } from 'ui';

import { navigationLinks } from '../../layouts/utils';
import { CommandItems } from './types';

const quickActions: CommandItem[] = [];

const useCommandItems = (query: string): CommandItems => {
  const navigate = useNavigate();

  const loading = false;

  const navigation: CommandItem[] = useMemo(() => {
    const matching = navigationLinks
      .filter((item) => item.type === undefined)
      .filter((link) =>
        link.label.toLowerCase().includes(query.toLocaleLowerCase()),
      );
    return matching.slice(0, Math.min(matching.length, 4)).map((link) => ({
      action: () => navigate(link.to),
      icon: link.icon,
      label: link.label,
    }));
  }, [navigate, query]);

  const empty = navigation.length === 0;

  return {
    empty,
    loading,
    navigation,
    quickActions: [],
  };
};

export default useCommandItems;
