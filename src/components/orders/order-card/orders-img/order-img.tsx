import { FC } from 'react'
import styles from "./order-img.module.css";

type TOrderImg = {
  image: string;
  alt: string;
}

export const OrderImg: FC<TOrderImg> = ({ image, alt }) => {
  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <img className={styles.image} src={image} alt={alt} />
      </div>
    </div>
  );
};
