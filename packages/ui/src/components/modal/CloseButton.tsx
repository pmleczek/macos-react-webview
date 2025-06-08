import Button from '../button';
import styles from './modal.module.css';
import type { ModalCloseButtonProps } from './types';

const CloseButton = ({ onHide }: ModalCloseButtonProps) => {
  return (
    <Button.Icon
      className={styles.close_button}
      hoverBackground={false}
      icon="close"
      iconProps={{ size: 20 }}
      onClick={onHide}
    />
  );
};

export default CloseButton;
