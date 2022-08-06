import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

const initialState = {
  data: [],
  isLoading: false,
  hasError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: action.data,
        burgerIngredients: {
          ...state.burgerIngredients,
          bun: action.bun,
          fillings: action.fillings,
        },
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
