import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import ingredientType from "../../utils/prop-types";

const Ingredient = (props) => {
  return (
    <div className={`${styles.ingredient}`}>
      <img className={"pl-4 pr-4"} src={props.image} alt={props.name} />
      <div className={`${styles.priceBox} mt-1 mb-1`}>
        <p className={`${styles.price} text text_type_main-default pr-2`}>
          {props.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.title} text text_type_main-default `}>{props.name}</h3>
      <Counter count={props.__v} size="default" />
    </div>
  );
}

Ingredient.propTypes = ingredientType.isRequired;

export default Ingredient