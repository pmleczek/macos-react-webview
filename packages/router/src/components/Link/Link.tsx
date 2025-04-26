import type { LinkProps } from "./types";

const Link = <T,>({ children, to }: LinkProps<T>) => {
  const handleClick = () => {
    console.log(`Link clicked. Navigate to: ${String(to)}`);
  };

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default Link;
