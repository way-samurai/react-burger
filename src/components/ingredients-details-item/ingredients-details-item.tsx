import style from "./ingredients-details-item.module.css";
import { FC } from 'react';

type TIngredientsDetailsItem = {
  text: string, 
  value: number
}

const IngredientsDetailsItem:FC<TIngredientsDetailsItem> = ({text, value}) => {
  return (
    <li className={`${style.item}`}>
      <p className={`${style.text} text text_type_main-default text_color_inactive pb-2`}>
        {text}
      </p>
      <p className={`${style.text} text text_type_digits-default text_color_inactive`}>
        {value}
      </p>
    </li>
  );
};

export default IngredientsDetailsItem;
