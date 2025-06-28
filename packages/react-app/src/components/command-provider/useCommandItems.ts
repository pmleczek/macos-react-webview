import { CommandItems } from './types';

const useCommandItems = (query: string): CommandItems => {
  const empty = query.length > 0;
  const loading = query.length === 0;

  return {
    empty,
    loading,
    quickActions: [],
  };
};

export default useCommandItems;
