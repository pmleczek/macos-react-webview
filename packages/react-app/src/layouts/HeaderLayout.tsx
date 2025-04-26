import { HeaderBar } from "@components";
import type { LayoutProps } from "./types";

const HeaderLayout = ({ children }: LayoutProps) => {
  return (
    <div className="header-layout-container">
      <HeaderBar />
      {children}
    </div>
  );
};

export default HeaderLayout;
