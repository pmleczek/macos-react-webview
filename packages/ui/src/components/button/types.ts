import type { LucideProps } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

import type { IconName } from '../icon';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends BaseButtonProps {
  label: string;
  variant?: ButtonVariant;
}

export interface IconButtonProps extends BaseButtonProps {
  hoverBackground?: boolean;
  icon: IconName;
  iconProps?: LucideProps;
}
