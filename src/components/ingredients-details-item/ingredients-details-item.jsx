import style from "./ingredients-details-item.module.css";
import PropTypes from 'prop-types';


const IngredientsDetailsItem = ({text, value}) => {
  
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

IngredientsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default IngredientsDetailsItem;
