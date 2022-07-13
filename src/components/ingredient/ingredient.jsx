import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

const Ingredient = ({image, name, price, __v}) => {
  return (
    <div className={`${styles.ingredient}`}>
      <img className={"pl-4 pr-4"} src={image} alt={name} />
      <div className={`${styles.priceBox} mt-1 mb-1`}>
        <p className={`${styles.price} text text_type_main-default pr-2`}>{price}</p>
        <CurrencyIcon type="primary"/>
      </div>
      <h3 className={`${styles.title} text text_type_main-default `}>{name}</h3>
      <Counter count={__v} size="default" />
    </div>
    
  )
}

Ingredient.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  __v: PropTypes.number.isRequired,
}

export default Ingredient