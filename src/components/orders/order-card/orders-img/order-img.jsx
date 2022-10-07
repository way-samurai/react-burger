import propTypes from "prop-types";
import styles from "./order-img.module.css";

export const OrderImg = ({ image, alt }) => {
  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <img className={styles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

OrderImg.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};
