import Ingredient from "../ingredient/ingredient.jsx";
import styles from "./ingredients-category.module.css";
import PropTypes from "prop-types";
import { useSelector } from "../../services/types/index";

const IngredientCategory = ({tabRef, name, type}) => {
  const data = useSelector((store) => store.burgerIngredients.data);

  return (
    <section className="mb-10" id={type}>
      <h2 className="text text_type_main-medium mb-6" ref={tabRef}>
        {name}
      </h2>
      <ul className={`${styles.ingredients}`}>
        {data.map((e) => {
          if (e.type === type) {
            return (
              <li
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