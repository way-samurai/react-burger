import { TModalOverlay } from "../../services/types/data";
import styles from "./modal-overlay.module.css";
import { FC } from 'react'

const ModalOverlay:FC<TModalOverlay> = ({onClose}) => {
  return <div className={styles.overlay} onClick={onClose}></div>
}

export default ModalOverlay;