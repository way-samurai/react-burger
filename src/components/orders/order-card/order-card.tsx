import { useMemo, FC } from "react";
import { useSelector } from "../../../services/types/index";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { OrderImg } from "./orders-img/order-img";
import { formatDate } from "../../../utils/formate-date";

import styles from "./order-card.module.css";
import { TFeed } from "../../../services/types/data";

type TOrderCard = {
  order: TFeed;
  statusVue: boolean;
}

export const OrderCard: FC<TOrderCard> = ({ order, statusVue }) => {
  const ingredients = useSelector((store) => store.burgerIngredients.data);
  const { createdAt, number, name } = order;
  const arrIngredientsLength = order.ingredients.length;
  const hideIngredients = arrIngredientsLength - 6;
  const maxIngredients = 6;

  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [orderIngredientsData]);

  return (
    <div className={styles.container}>
      <div className={styles.orderid}>
        <p className="text text_type_digits-default">#{number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatDate(createdAt)}
        </p>
      </div>
      <div className={styles.info}>
        <h2 className={`${styles.text} text text_type_main-medium`}>{name}</h2>
        {statusVue && (
          <p className={`${styles.status} text text_type_main-default`}>
            {order.status === "done"
              ? "Выполнен"
              : order.status === "pending"
              ? "Готовится"
              : order.status === "created"
              ? "Создан"
              : "Выполнен"}
          </p>
        )}
      </div>
      <div className={styles.price}>
        <ul className={styles.list}>
          {orderIngredientsData &&
            arrIngredientsLength <= 5 &&
            orderIngredientsData.map((item, index) => {
              let zIndex = maxIngredients - index;
              return (
                <li
                  className={styles.items}
                  style={{ zIndex: zIndex }}
                  key={index}
                >
                  {item && <OrderImg image={item.image} alt={item.name} />}
                </li>
              );
            })}
          {orderIngredientsData &&
            arrIngredientsLength >= 6 &&
            orderIngredientsData.slice(0, 5).map((item, index) => {
              let zIndex = maxIngredients - index;
              return (
                <li
                  className={styles.items}
                  style={{ zIndex: zIndex }}
                  key={index}
                >
                  {item && <OrderImg image={item.image} alt={item.name} />}
                </li>
              );
            })}
          {orderIngredientsData &&
            arrIngredientsLength > 6 &&
            orderIngredientsData.slice(5, 6).map((item, index) => {
              let zIndex = -index;
              return (
                <li
                  className={styles.items}
                  style={{ zIndex: zIndex }}
                  key={index}
                >
                  {item && (
                    <>
                      <p
                        className={`text text_type_main-default ${styles.hideText}`}
                      >{`+${hideIngredients}`}</p>
                      <div className={styles.hidePic}>
                        <OrderImg image={item.image} alt={item.name} />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
        <div className={styles.price}>
          <p className="text text_type_digits-default pr-2">
            {orderTotalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
