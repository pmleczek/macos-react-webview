import type { ButtonHTMLAttributes } from "react";
import type { IconProps } from "@tabler/icons-react";

import type { IconName } from "ui";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export interface ButtonIconProps {
  icon: IconName;
  iconProps?: IconProps;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
