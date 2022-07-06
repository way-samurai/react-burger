import { useState, useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from "./burger-ingredients.module.css";
import IngredientsCategory from '../ingredients-category/ingredients-category'
import PropTypes from 'prop-types';
import ingredientPropType from '../../utils/prop-types';

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const clickOnTab = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <section className={`${ingredientsStyles.section} mr-10`}>
      <h1 className={`${ingredientsStyles.heading} text text_type_main-large pt-10 pb-5`}>Соберите бургер</h1>
      <div className={`${ingredientsStyles.tabContainer}`}>
        <Tab value="bun" active={current === "bun"} onClick={(evt) => clickOnTab(evt, bunRef)}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={(evt) => clickOnTab(evt, sauceRef)}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={(evt) => clickOnTab(evt, mainRef)}>Начинки</Tab>
      </div>
      <ul className={`${ingredientsStyles.list} mt-10 `}>
        <IngredientsCategory data={props.data} type="bun" tabRef={bunRef} name="Булки" id="one"></IngredientsCategory> 
        <IngredientsCategory data={props.data} type="sauce" tabRef={sauceRef} name="Соусы" id="two"></IngredientsCategory>
        <IngredientsCategory data={props.data} type="main" tabRef={mainRef} name="Начинки" id="three"></IngredientsCategory>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerIngredients;
