import React, { useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { apiPostOrder } from "../../utils/api/api";
import { useSelector } from "react-redux";

const BurgerConstructor = () => {
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);

  const { data } = [];
  const [orderNumber, setOrderNumber] = useState(0);

  const ingredients = data.filter((item) => item.type !== "bun");
  const bun = data.find((item) => item.type === "bun");
  const totalPrice = ingredients.reduce(
    (total, current) => total + current.price,
    bun.price * 2
  );

  const [active, setActive] = useState(false);
  const toggleModal = () => !isLoading;
  const makeOrder = async () => {
    try {
      const res = await apiPostOrder(ingredients.map((item) => item._id));
      const newOrder = await res;
      setOrderNumber(`${newOrder.order.number}`);
      toggleModal();
    } catch (error) {
      setOrderNumber(0);
      console.log(error)
    }
  };

  return (
    <section className={`${styles.section} pt-25`}>
      {isLoading && (
        <Modal title="" onClose={toggleModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      <div className="ml-4">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>
      <ul className={`${styles.stuffingList}`}>
        {data.map((item) => {
          if (item.type !== "bun") {
            return (
              <li
                className={`${styles.stuffingItem} mb-4 mr-4 ml-4`}
                key={item._id}
              >
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <div className="ml-4">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>

      <div className={`${styles.total} mt-10`}>
        <div className={`${styles.priceBox} mr-10`}>
          <p className={`${styles.price} text text_type_digits-medium`}>
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            makeOrder();
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
