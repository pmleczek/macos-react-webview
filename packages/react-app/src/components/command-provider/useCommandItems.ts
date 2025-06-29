import { useNavigationActions, useQuickActions } from './hooks';
import { CommandItems } from './types';

const useCommandItems = (query: string): CommandItems => {
  // Navigation actions
  const navigation = useNavigationActions(query);

  // Quick actions
  const quickActions = useQuickActions(query);

  const empty = [navigation, quickActions].every((arr) => arr.length === 0);
  const loading = false;

  return {
    empty,
    loading,
    navigation,
    quickActions,
  };
};

export default useCommandItems;
