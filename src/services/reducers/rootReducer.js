import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order-details";

const rootReducer = combineReducers({
  order: orderReducer, //Объект созданного заказа
  burgerIngredients: ingredientsReducer, //список всех полученных ингредиентов
  ingredientDetails: ingredientReducer,  //объект текущего просматриваемого ингредиента
  burgerConstructor: constructorReducer, //список всех ингредиентов в текущем конструкторе бургера
});

export default rootReducer