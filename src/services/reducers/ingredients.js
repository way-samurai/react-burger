import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

const initialState = {
  data: [],
  isLoading: false,
  dataRequest: false,
  modalActive: false,
  hasError: false,
}

export const ingredientsReducer = (state = initialState, action) => {
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
