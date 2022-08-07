import React, { useMemo, } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../services/actions/order-details.js";

const BurgerConstructor = () => {
  const modalActive = useSelector((store) => store.burgerIngredients.modalActive);
  const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
  const dispatch = useDispatch();

  const totalPrice = () => {
    if (ingredients === null) {
      return 0;
    } else {
      ingredients.reduce(
        (total, current) => total + current.price,
        bun.price * 2
      );
    }
  }

  const filling = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  const itemsId = useMemo(
    () => ingredients.map((item) => item._id),
    [ingredients]
  )

  const orderDetails = (itemsId) => {
    dispatch(getOrderDetails(itemsId));
  }

  const toggleModal = () => !modalActive;

  return (
    <section className={`${styles.section} pt-25`}>
      {modalActive && (
        <Modal title="" onClose={toggleModal}>
          <OrderDetails />
        </Modal>
      )}

      {bun || ingredients.lenghth > 0 ? (
        <div>
          {bun && (
            <div className="ml-4">
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
              ingredients.map((item) => {
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
            <div className="ml-4">
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
          Перетащите сюда булку
        </div>
      )}
      {bun && ingredients.length > 0 && (
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
              orderDetails(itemsId);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default BurgerConstructor;

// {/* <ul className={`${styles.stuffingList}`}>
//         <div className="ml-4">
//           {bun === null ? (
//             <p className="text text_type_main-large pr-2">Выберите булочку</p>
//           ) : (
//             <ConstructorElement
//               type="top"
//               isLocked={true}
//               text={`${bun.name} (верх)`}
//               price={`${bun.price}`}
//               thumbnail={`${bun.image}`}
//             />
//           )}
//         </div>
//         {ingredients.map((item) => {
//           return (
//             <li
//               className={`${styles.stuffingItem} mb-4 mr-4 ml-4`}
//               key={item._id}
//             >
//               <DragIcon type="primary" />
//               <ConstructorElement
//                 text={item.name}
//                 price={item.price}
//                 thumbnail={item.image}
//               />
//             </li>
//           );
//         })}

//         {ingredients.length === 0 ? (
//           <p
//           // className={`${burgerConstructorStyle.list} ${burgerConstructorStyle.text} pr-2 text text_type_main-large`}
//           >
//             &#8592; Выберите начинку
//           </p>
//         ) : (
//           ingredients.map((item) => {
//             if (item.type !== "bun") {
//               return (
//                 <li
//                   className={`${styles.stuffingItem} mb-4 mr-4 ml-4`}
//                   key={item._id}
//                 >
//                   <DragIcon type="primary" />
//                   <ConstructorElement
//                     text={item.name}
//                     price={item.price}
//                     thumbnail={item.image}
//                   />
//                 </li>
//               );
//             } else {
//               return null;
//             }
//           })
//           // <ul className={`${burgerConstructorStyle.list} pr-2`}>
//           //   {ingredients.map((elem, index) => {
//           //     if (elem.type === "sauce" || elem.type === "main") {
//           //       return (
//           //         <ConstructorItems key={elem.id} items={elem} index={index} />
//           //       );
//           //     }
//           //   })}
//           // </ul>
//         )}

//         <div className="ml-4">
//           {bun === null ? (
//             <p className="text text_type_main-large pr-2">Выберите булочку</p>
//           ) : (
//             <ConstructorElement
//               type="bottom"
//               isLocked={true}
//               text={`${bun.name} (низ)`}
//               price={`${bun.price}`}
//               thumbnail={`${bun.image}`}
//             />
//           )}
//         </div>
//       </ul>

//       <div className={`${styles.total} mt-10`}>
//         <div className={`${styles.priceBox} mr-10`}>
//           <p className={`${styles.price} text text_type_digits-medium`}>
//             {totalPrice}
//           </p>
//           <CurrencyIcon type="primary" />
//         </div>
//         <Button
//           type="primary"
//           size="large"
//           onClick={() => {
//             orderDetails(itemsId);
//           }}
//         >
//           Оформить заказ
//         </Button>
//       </div> */}
