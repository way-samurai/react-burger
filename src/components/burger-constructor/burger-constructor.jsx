import { useEffect, useMemo, useState, } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../services/actions/order-details.js";
import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_ITEM
} from "../../services/actions/constructor";
import { useDrop } from "react-dnd";
import ConstructorItems from "../burger-constructor-items/burger-constructor-items";
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  const isAuthSuccess = useSelector((store) => store.user.isAuthSuccess);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const [modalActive, setModalActive] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const itemsId = useMemo(
    () => ingredients.map((item) => item._id),
    [ingredients]
  )

  const filling = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  const openModal = () => {
    if (!isAuthSuccess) {
      history.push("/login");
    }
    setModalActive(true);
  }

  const closeModal = () => {
    setModalActive(false);
  }

  const showOrderDetails = (productsid) => {
    dispatch(getOrderDetails(productsid));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: CONSTRUCTOR_ADD_BUN,
          data: item.ingredient,
        });
      } else {
        dispatch({
          type: CONSTRUCTOR_ADD_ITEM,
          data: { ...item.ingredient, id: Date.now() },
        });
      }
    },
  });

  useEffect(() => {
    const totalPrice = filling.reduce(
      (current, total) => current + total.price,
      bun === null ? 0 : bun.price * 2
    );
    setTotal(totalPrice);
  }, [bun, filling]);

  return (
    <section className={`${styles.section} pt-25`}>
      {modalActive && (
        <Modal title="" onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={styles.staffingContainer} ref={dropTarget}>
        {bun || ingredients.length > 0 ? (
          <div className={styles.staffingContainer}>
            {bun && (
              <div className="ml-10">
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={`${bun.price}`}
                  thumbnail={`${bun.image}`}
                />
              </div>
            )}

            <ul className={styles.stuffingList}>
              {ingredients.length > 0 ? (
                ingredients.map((item, index) => {
                  return (
                    <ConstructorItems index={index} key={item.id} item={item} />
                  );
                })
              ) : (
                <div
                  className={`${styles.emptyStaffingIngredients} text text_type_main-medium text_color_inactive ml-4`}
                >
                  Перетащите сюда начинку
                </div>
              )}
            </ul>

            {bun && (
              <div className="ml-10">
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={`${bun.price}`}
                  thumbnail={`${bun.image}`}
                />
              </div>
            )}
          </div>
        ) : (
          <div
            className={`${styles.emptyStaffingContainer} text text_type_main-medium text_color_inactive`}
          >
            Перетащите сюда булку и начинку!
          </div>
        )}
      </div>
      {(bun || ingredients.length > 0) && (
        <div className={`${styles.total} mt-10`}>
          <div className={`${styles.priceBox} mr-10`}>
            <p className={`${styles.price} text text_type_digits-medium`}>
              {total}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          {ingredients.length === 0 || bun === null ? (
            <Button type="primary" size="large" disabled>
              Оформить заказ
            </Button>
          ) : (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                showOrderDetails(itemsId);
                openModal();
              }}
            >
              Оформить заказ
            </Button>
          )}
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;

