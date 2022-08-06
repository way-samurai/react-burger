import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAILED,
  RESET_ORDER
} from '../actions/order-details.js';

const initialState = {
  orderNumber: null,
  isLoading: false,
  hasError: false,
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    }
    case CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        isLoading: false,
        hasError: false,
      }
    }
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        orderNumber: null,
        isLoading: false,
        hasError: true,
      }
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderNumber: null,
        isLoading: false,
        hasError: false,
      }
    }
    default:
      return state;
  }
}