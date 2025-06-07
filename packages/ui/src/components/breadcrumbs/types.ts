import type { ReactNode } from 'react';
import type { To } from 'react-router';

export interface BreadcrumbsProps {
  children?: ReactNode;
}

export interface BreadcrumbsLinkProps {
  label: string;
  to: To;
}
