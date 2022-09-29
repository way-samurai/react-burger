import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order-details";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  order: orderReducer, //Объект созданного заказа
  burgerIngredients: ingredientsReducer, //список всех полученных ингредиентов
  burgerConstructor: constructorReducer, //список всех ингредиентов в текущем конструкторе бургера
  user: authReducer, //авторизация
});

export default rootReducer