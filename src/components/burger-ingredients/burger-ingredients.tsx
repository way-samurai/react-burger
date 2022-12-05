import { useState, useEffect, FC } from 'react';
import { useInView } from "react-intersection-observer";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsCategory from '../ingredients-category/ingredients-category';

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const [bunRef, bunInView] = useInView({ threshold: 0.1 });
  const [sauceRef, sauceInView] = useInView({ threshold: 0.1 });
  const [mainRef, mainInView] = useInView({ threshold: 0.1 });

  const clickOnTab = (type: string) => {
    setCurrent(type);
    const section = document.getElementById(type) as HTMLElement;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurrent("bun");
        break;
      case sauceInView:
        setCurrent("sauce");
        break;
      case mainInView:
        setCurrent("main");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleIngredientScroll();
  }, [bunInView, sauceInView, mainInView]);

  return (
    <section className={`${ingredientsStyles.section} mr-10`}>
      <h1
        className={`${ingredientsStyles.heading} text text_type_main-large pt-10 pb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${ingredientsStyles.tabContainer}`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => clickOnTab("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => clickOnTab("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => clickOnTab("main")}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${ingredientsStyles.list} mt-10 `}>
        <IngredientsCategory type="bun" tabRef={bunRef} name="Булки" />
        <IngredientsCategory
          type="sauce"
          tabRef={sauceRef}
          name="Соусы"
        />
        <IngredientsCategory
          type="main"
          tabRef={mainRef}
          name="Начинки"
        />
      </ul>
    </section>
  );
}

export default BurgerIngredients;
