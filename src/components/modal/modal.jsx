import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from "./modal.module.css";
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ( {title, onClose, children} ) => {
  const modalContainer = document.getElementById("modal");
  useEffect(() => {
    const handleEscKeydown = (evt) => {
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

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Modal