import { useNavigate } from "../hooks";
import type { LinkProps } from "./types";

const Link = ({ children, to, params }: LinkProps) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)}>
      {children}
    </button>
  );
};

export default Link;
