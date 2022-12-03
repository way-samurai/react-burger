import { apiPostOrder } from "../../utils/api/api";
import { CREATE_ORDER_FAILED, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, RESET_ORDER } from "./constants/order-details";

export function getOrderDetails(order) {
  return function (dispatch) {
    dispatch({
      type: CREATE_ORDER_REQUEST
    });
    apiPostOrder(order)
      .then((res) => {
        dispatch({
          type: CREATE_ORDER_SUCCESS,
          number: res.order.number
        });
      })
      .catch(() => {
        dispatch({
          type: CREATE_ORDER_FAILED,
        });
      })
  };
}

export function resetOrderNumber() {
  return {
    type: RESET_ORDER,
  };
}