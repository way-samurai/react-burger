import React, { useState } from "react";
import Ingredient from "../ingredient/ingredient.jsx";
import styles from "./ingredients-category.module.css";
import PropTypes from "prop-types";
import ingredientPropType from '../../utils/prop-types';
import Modal from "../modal1/modal";
import IngredientDetails from "../ingredient-details/IngredientDetails.jsx";

const IngredientCategory = (props) => {
  const [active, setActive] = useState(null);
  const toggleModal = () => setActive(null);

  return (
    <section className="mb-10">
      {active && (
        <Modal onClose={toggleModal}>
          <IngredientDetails {...active}/>
        </Modal>
      )}
      <h2 className="text text_type_main-medium mb-6" ref={props.tabRef}>
        {props.name}
      </h2>
      <ul className={`${styles.ingredients}`}>
        {props.data.map((e) => {
          if (e.type === props.type) {
            return (
              <li onClick={() => {setActive(e)}} key={e._id}>
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
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}

export default IngredientCategory