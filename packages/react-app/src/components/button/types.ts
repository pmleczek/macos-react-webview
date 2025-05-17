import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
