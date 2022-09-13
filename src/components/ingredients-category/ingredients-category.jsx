import { useState } from "react";
import Ingredient from "../ingredient/ingredient.jsx";
import styles from "./ingredients-category.module.css";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { useSelector } from "react-redux";

const IngredientCategory = ({tabRef, name, type}) => {
  const data = useSelector((store) => store.burgerIngredients.data);
  const [active, setActive] = useState(null);  
  const toggleModal = () => setActive(null);

  return (
    <section className="mb-10" id={type}>
      {active && (
        <Modal onClose={toggleModal}>
          <IngredientDetails {...active} />
        </Modal>
      )}
      <h2 className="text text_type_main-medium mb-6" ref={tabRef}>
        {name}
      </h2>
      <ul className={`${styles.ingredients}`}>
        {data.map((e) => {
          if (e.type === type) {
            return (
              <li
                onClick={() => {
                  setActive(e);
                }}
                key={e._id}
              >
                <Ingredient {...e} />
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </section>
  );
}

IngredientCategory.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default IngredientCategory