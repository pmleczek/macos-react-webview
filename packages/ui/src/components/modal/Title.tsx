import styles from './modal.module.css';
import type { ModalTitleProps } from './types';

const Title = ({ subtitle, title }: ModalTitleProps) => {
  return (
    <div className={styles.title_container}>
      <h3 className={styles.title_label}>{title}</h3>
      {subtitle && <h5 className={styles.subtitle_label}>{subtitle}</h5>}
    </div>
  );
};

export default Title;
