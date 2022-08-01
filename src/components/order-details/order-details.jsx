import React, { useContext } from 'react';
import style from "./order-details.module.css";
import orderAccepted from '../../images/order_accpeted.png';
import { OrderContext } from "../../services/order-context";

const OrderDetails = () => {
  const orderNumber = useContext(OrderContext);

	return (
		<div className={`${style.container} pl-25 pr-25`}>
			<h3 className={`${style.title} text text_type_digits-large pt-15 pb-8`}>{orderNumber}</h3>
			<p className={`${style.text} text text_type_main-medium pb-15`}>идентификатор заказа</p>
			<img className={`${style.icon} pb-15`} src={orderAccepted} alt={orderAccepted} />
			<p className={`${style.text} text text_type_main-default pb-2`}>Ваш заказ начали готовить</p>
			<p className={`${style.text} text text_type_main-default text_color_inactive pb-30`}>Дождитесь готовности на орбитальной станции</p>
		</div>
	)
}

export default OrderDetails;