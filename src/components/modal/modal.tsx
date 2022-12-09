import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TModal } from '../../services/types/data';

const Modal:FC<TModal> = ( {title, onClose, children} ) => {
  const modalContainer = document.getElementById("modal") as HTMLElement;
  useEffect(() => {
    const handleEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose()
      }
    };
    document.addEventListener('keydown', handleEscKeydown);
    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  return createPortal (
    <>
      <div className={styles.modal}>
        <h3 className={`${styles.title} text text_type_main-large pt-15 pb-1 pl-10`}>
          {title}
        </h3>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose}/>
    </>,
    modalContainer
  )
}

export default Modal