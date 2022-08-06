import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { ingredientReducer } from "./ingredient";
import { orderReducer } from "./order-details";

const rootReducer = combineReducers({
  order: orderReducer,
  burgerIngredients: ingredientsReducer,
  ingredientDetails: ingredientReducer,
  burgerConstructor: constructorReducer
});

export default rootReducer