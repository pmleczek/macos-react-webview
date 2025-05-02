import icons from "./icons";
import type { IconProps } from "./types";

const Icon = ({ name, ...props }: IconProps) => {
  const Component = icons[name];

  return <Component {...props} />;
};

export default Icon;
