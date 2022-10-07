import React, { useEffect } from "react";
import style from "./order-details.module.css";
import orderAccepted from "../../images/order_accpeted.png";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Preloader } from "../preloader/preloader";
import { resetOrderNumber } from "../../services/actions/order-details";
import { resetConstructor } from "../../services/actions/constructor";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const number = useSelector((store) => store.order.number);

  useEffect(() => {
    return dispatch(resetOrderNumber());
  }, []);

  useEffect(() => {
    if (number !== null) {
      dispatch(resetConstructor());
    }
  }, [number]);

  if (number === null) {
    return (
      <Route>
        <Preloader />
      </Route>
    );
  }

  return (
    <div className={`${style.container} pl-25 pr-25`}>
      <h3 className={`${style.title} text text_type_digits-large pt-15 pb-8`}>
        {number}
      </h3>
      <p className={`${style.text} text text_type_main-medium pb-15`}>
        идентификатор заказа
      </p>
      <img
        className={`${style.icon} pb-15`}
        src={orderAccepted}
        alt={orderAccepted}
      />
      <p className={`${style.text} text text_type_main-default pb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${style.text} text text_type_main-default text_color_inactive pb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
