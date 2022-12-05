import Ingredient from "../ingredient/ingredient";
import styles from "./ingredients-category.module.css";
import { useSelector } from "../../services/types/index";
import { FC } from 'react';

type TProps = {
  tabRef: any,
  name: string,
  type: string
}

const IngredientCategory: FC<TProps> = ({tabRef, name, type}) => {
  const data = useSelector((store) => store.burgerIngredients.data);
  console.log(tabRef)
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

export default IngredientCategory