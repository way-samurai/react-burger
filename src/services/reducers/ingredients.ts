import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/constants/ingredients';
import { TIngredientsActions } from '../actions/ingredients';
import { TIngredient } from '../types/data';

type TIngredientsState = {
  data: Array<TIngredient>,
  isLoading: boolean,
  dataRequest: boolean,
  hasError: boolean,
}

const initialState: TIngredientsState = {
  data: [],
  isLoading: false,
  dataRequest: false,
  hasError: false,
}

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        dataRequest: false,
        hasError: false,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dataRequest: true,
        data: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
        dataRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
