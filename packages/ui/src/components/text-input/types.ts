import type { ReactNode } from 'react';

export interface TextInputLabelProps {
  htmlFor?: string;
  text: string;
}

export interface TextInputProps {
  autoCorrect?: boolean;
  className?: string;
  id?: string;
  leftItem?: ReactNode;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
}
