import React from "react";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
  return <div className={styles.overlay} onClick={onClose}></div>
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};

export default ModalOverlay;