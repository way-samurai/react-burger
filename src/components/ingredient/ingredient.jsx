import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import ingredientType from "../../utils/prop-types";
import { useDrag } from "react-dnd";
import { useMemo, } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, } from "react-router-dom";

const Ingredient = (ingredient) => {
  const location = useLocation();
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let { _id } of ingredients) if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;
        return count;
      },
    [bun, ingredients, ingredient._id]
  );

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
      className={`${styles.ingredient}`}
      style={{ opacity }}
      ref={dragRef}
    >
      <img
        className={"pl-4 pr-4"}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <div className={`${styles.priceBox} mt-1 mb-1`}>
        <p className={`${styles.price} text text_type_main-default pr-2`}>
          {ingredient.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${styles.title} text text_type_main-default `}>
        {ingredient.name}
      </h3>
      {counter() > 0 && <Counter count={counter()} size="default" />}
    </Link>
  );
};

Ingredient.propTypes = ingredientType.isRequired;

export default Ingredient;
