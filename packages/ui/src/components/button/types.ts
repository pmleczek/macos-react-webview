import type { LucideProps } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

import type { IconName } from '../icon';

interface BaseButtonProps {
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export interface ButtonProps extends BaseButtonProps {
  label: string;
}

export interface IconButtonProps extends BaseButtonProps {
  hoverBackground?: boolean;
  icon: IconName;
  iconProps?: LucideProps;
}
