import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { authReducer } from "./auth";
import { feedReducer } from "./feed";
import { ordersReducer } from "./orders";
import { orderReducer } from "./order-details";

const rootReducer = combineReducers({
  order: orderReducer, //Объект созданного заказа
  burgerIngredients: ingredientsReducer, //список всех полученных ингредиентов
  burgerConstructor: constructorReducer, //список всех ингредиентов в текущем конструкторе бургера
  user: authReducer, //авторизация
  wsFeed: feedReducer, //лента заказов
  wsOrders: ordersReducer, //история заказов
});

export default rootReducer