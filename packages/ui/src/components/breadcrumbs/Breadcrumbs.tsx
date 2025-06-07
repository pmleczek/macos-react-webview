import styles from './breadcrumbs.module.css';
import Link from './Link';
import Separator from './Separator';
import type { BreadcrumbsProps } from './types';

const Breadcrumbs = ({ children }: BreadcrumbsProps) => {
  return <div className={styles.container}>{children}</div>;
};

Breadcrumbs.Link = Link;
Breadcrumbs.Separator = Separator;

export default Breadcrumbs;
