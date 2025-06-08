import Body from './Body';
import CloseButton from './CloseButton';
import Footer from './Footer';
import Header from './Header';
import styles from './modal.module.css';
import Title from './Title';
import type { ModalProps } from './types';

const Modal = ({ children, onHide, show }: ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={styles.overlay} onClick={onHide}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Body = Body;
Modal.CloseButton = CloseButton;
Modal.Footer = Footer;
Modal.Header = Header;
Modal.Title = Title;

export default Modal;
