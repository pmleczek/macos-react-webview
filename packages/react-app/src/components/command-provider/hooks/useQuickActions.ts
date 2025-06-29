import Fuse from 'fuse.js';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import type { CommandItem } from 'ui';

import { getQuickActionsItems } from '../actions/quickActions';
import { CommandItemWithKeywords } from '../types';

const LIMIT = 3;

const useQuickActions = (query: string): CommandItem[] => {
  const navigate = useNavigate();

  const items = useMemo(() => {
    return getQuickActionsItems(navigate);
  }, [navigate]);

  const fuse = useMemo(() => {
    return new Fuse<CommandItemWithKeywords>(items, {
      keys: [
        {
          name: 'label',
          weight: 0.9,
        },
        {
          name: 'keywords',
          weight: 0.1,
        },
      ],
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [items]);

  const searchResults = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed === '') {
      return items.slice(0, 3);
    }

    return fuse
      .search(query.trim(), { limit: LIMIT })
      .map((resultEntry) => resultEntry.item);
  }, [fuse, items, query]);

  return searchResults;
};

export default useQuickActions;
