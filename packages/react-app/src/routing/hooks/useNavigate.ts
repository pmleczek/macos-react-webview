import { useCallback, useContext } from "react";

import { NavigationStateContext } from "../contexts";

const useNavigate = () => {
  const navigationState = useContext(NavigationStateContext);

  const navigate = useCallback(
    (route: string) => {
      navigationState?.updateState({ route, params: {} });
    },
    [navigationState]
  );

  return navigate;
};

export default useNavigate;
