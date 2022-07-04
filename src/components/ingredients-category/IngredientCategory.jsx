import React from "react";
import Ingredient from "../ingredient/Ingredient.jsx";
import styles from "./ingredientCategory.module.css";
import PropTypes from "prop-types";
import IngredientPropType from '../../utils/prop-types';

const IngredientCategory = (props) => {
  return (
    <section>
      <h2 className="text text_type_main-medium mt-10 mb-6" ref={props.tabRef}>
        {props.name}
      </h2>
      <ul className={`${styles.ingredients}`}>
        {props.data.map((e) => {
          if (e.type === props.type) {
            return (
              <li key={e._id}>
                <Ingredient {...e}/>
              </li>
            )
          } else {
            return null
          }
        })}
      </ul>
    </section>
  )
}

IngredientCategory.propTypes = {
  data: PropTypes.arrayOf(IngredientPropType).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}

export default IngredientCategory