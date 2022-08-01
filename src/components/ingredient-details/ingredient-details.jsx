import React from "react";
import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import IngredientsDetailsItem from "../ingredients-details-item/ingredients-details-item";

const IngredientDetails = ({
  image_large,
  name,
  calories,
  proteins,
  fat,
  carbohydrates,
}) => {
  return (
    <>
      <h2 className={`${styles.title}  text text_type_main-large ml-10 pt-5`}>
        Детали ингредиента
      </h2>
      <div className={`${styles.container} pb-15 `}>
        <img className={`${styles.pic}`} src={image_large} alt={name} />
        <h3 className={`${styles.ingredient} text text_type_main-medium pt-3`}>
          {name}
        </h3>
        <ul className={`${styles.list} pt-8`}>
          <IngredientsDetailsItem value={calories} text="Калорийность, ккал" />
          <IngredientsDetailsItem value={proteins} text="Белки, г" />
          <IngredientsDetailsItem value={fat} text="Жиры, г" />
          <IngredientsDetailsItem value={carbohydrates} text="Углеводы, г" />
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
};

export default IngredientDetails;
