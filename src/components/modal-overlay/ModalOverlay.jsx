import React from "react";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ closeModal }) => (
  <div className={styles.overlay} onClick={closeModal}></div>
)

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;