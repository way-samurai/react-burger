import React from "react";
import styles from "./ingredientsDetails.module.css";
import PropTypes from "prop-types";
import IngredientsDetailsItem from "../ingredients-details-item/ingredients-details-item";

const IngredientDetails = (props) => {
  return (
    <>
      <h2 className={`${styles.title}  text text_type_main-large ml-10 pt-5`}>
        Детали ингредиента
      </h2>
      <div className={`${styles.container} pb-15 `}>
        <img
          className={`${styles.pic}`}
          src={props.image_large}
          alt={props.name}
        />
        <h3 className={`${styles.ingredient} text text_type_main-medium pt-3`}>
          {props.name}
        </h3>
        <ul className={`${styles.list} pt-8`}>
          <IngredientsDetailsItem
            value={props.calories}
            text="Калорийность, ккал"
          />
          <IngredientsDetailsItem value={props.proteins} text="Белки, г" />
          <IngredientsDetailsItem value={props.fat} text="Жиры, г" />
          <IngredientsDetailsItem
            value={props.carbohydrates}
            text="Углеводы, г"
          />
        </ul>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;
