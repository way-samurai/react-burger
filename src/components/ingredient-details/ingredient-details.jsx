import React from "react";
import styles from "./ingredient-details.module.css";
import IngredientsDetailsItem from "../ingredients-details-item/ingredients-details-item";
import ingredientType from "../../utils/prop-types";

const IngredientDetails = (props) => {
  return (
    <>
      <h2 className={`${styles.title}  text text_type_main-large ml-10 pt-5`}>
        Детали ингредиента
      </h2>
      <div className={`${styles.container} pb-15 `}>
        <img className={`${styles.pic}`} src={props.image_large} alt={props.name} />
        <h3 className={`${styles.ingredient} text text_type_main-medium pt-3`}>
          {props.name}
        </h3>
        <ul className={`${styles.list} pt-8`}>
          <IngredientsDetailsItem value={props.calories} text="Калорийность, ккал" />
          <IngredientsDetailsItem value={props.proteins} text="Белки, г" />
          <IngredientsDetailsItem value={props.fat} text="Жиры, г" />
          <IngredientsDetailsItem value={props.carbohydrates} text="Углеводы, г" />
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = ingredientType.isRequired;

export default IngredientDetails;
