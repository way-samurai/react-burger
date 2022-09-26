import styles from "./ingredient-details.module.css";
import IngredientsDetailsItem from "../ingredients-details-item/ingredients-details-item";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  const dataIngredients = useSelector((store) => store.burgerIngredients.data);
  const { id } = useParams();
  const ingredient = dataIngredients.find(
    (ingredient) => ingredient._id === id
  );

  return (
    <div className={`${styles.container} pb-15 `}>
      <img
        className={`${styles.pic}`}
        src={ingredient?.image_large}
        alt={ingredient?.name}
      />
      <h3 className={`${styles.ingredient} text text_type_main-medium pt-3`}>
        {ingredient?.name}
      </h3>
      <ul className={`${styles.list} pt-8`}>
        <IngredientsDetailsItem
          value={ingredient?.calories}
          text="Калорийность, ккал"
        />
        <IngredientsDetailsItem value={ingredient?.proteins} text="Белки, г" />
        <IngredientsDetailsItem value={ingredient?.fat} text="Жиры, г" />
        <IngredientsDetailsItem
          value={ingredient?.carbohydrates}
          text="Углеводы, г"
        />
      </ul>
    </div>
  );
};

export default IngredientDetails;
