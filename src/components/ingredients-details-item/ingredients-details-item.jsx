import React from "react";
import style from "./ingredients-details-item.module.css";

const IngredientsDetailsItem = (props) => {
  return (
    <li className={`${style.item}`}>
      <p className={`${style.text} text text_type_main-default text_color_inactive pb-2`}>
        {props.text}
      </p>
      <p className={`${style.text} text text_type_digits-default text_color_inactive`}>
        {props.value}
      </p>
    </li>
  );
};

export default IngredientsDetailsItem;
