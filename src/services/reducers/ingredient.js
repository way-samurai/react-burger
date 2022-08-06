import {
  SET_INGREDIENT_MODAL,
  RESET_INGREDIENT_MODAL,
} from "../actions/ingredient";

const initialState = {
  data: null,
  activeModal: false, //состояние для открытия модалок
  dataIngredientDetails: null,
}

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        activeModal: true, 
        dataIngredientDetails: action.ingredient,
      };
    }
    case RESET_INGREDIENT_MODAL: {
      return {
        ...state,
        activeModal: false,
        dataIngredientDetails: null
      };
    }
    default: {
      return state;
    }
  }
};