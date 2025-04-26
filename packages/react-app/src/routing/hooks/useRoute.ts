import { useContext } from "react";
import { NavigationStateContext } from "../contexts";

const useRoute = () => {
  const navigationState = useContext(NavigationStateContext);

  return navigationState?.state.route ?? "";
};

export default useRoute;
