import { useMemo } from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-info-ingredients.module.css";
import { OrderImg } from "../../orders/order-card/orders-img/order-img";

export const OrdersInfoIngredients = ({ details }) => {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.data
  );

  const count = (elem) => {
    let count = details.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredient = useMemo(() => {
    return details?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [details, ingredients]);

  return (
    <ul className={styles.scroller}>
      {orderIngredient &&
        [...new Set(orderIngredient)].map((item) => {
          return (
            <li className={`${styles.item} pr-6`} key={item._id}>
              {item && (
                <>
                  <div className={styles.info}>
                    <OrderImg image={item.image} alt={item.name} />
                    <p
                      className={`${styles.name} text text_type_main-default pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">
                      {item.type === "bun"
                        ? `${count(item) * 2} x ${item.price}`
                        : `${count(item)} x ${item.price}`}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </>
              )}
            </li>
          );
        })}
    </ul>
  );
};

OrdersInfoIngredients.propTypes = {
  details: propTypes.array.isRequired,
};
