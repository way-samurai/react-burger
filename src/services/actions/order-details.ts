import { apiPostOrder } from "../../utils/api/api";
import { AppDispatch } from "../types";

import { 
  CREATE_ORDER_FAILED, 
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_SUCCESS, 
  RESET_ORDER 
} from "./constants/order-details";

export interface ICreateOrderRequest {
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccess {
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly number: number
}

export interface ICreateOrderFailed {
  readonly type: typeof CREATE_ORDER_FAILED;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export type TOrderDetailsActions = 
  | ICreateOrderRequest
  | ICreateOrderSuccess
  | ICreateOrderFailed
  | IResetOrder

export function getOrderDetails(order: Array<string>) {
  return function (dispatch: AppDispatch) {
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

export function resetOrderNumber(): IResetOrder {
  return {
    type: RESET_ORDER,
  };
}