import { Link as LinkComponent } from 'react-router';

import styles from './breadcrumbs.module.css';
import type { BreadcrumbsLinkProps } from './types';

const Link = ({ label, to }: BreadcrumbsLinkProps) => {
  return (
    <LinkComponent className={styles.link_label} to={to}>
      {label}
    </LinkComponent>
  );
};

export default Link;
