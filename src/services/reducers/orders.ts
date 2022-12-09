import { TWsOrdersActions } from "../actions/actions-ws/ws_orders-action-ws";
import {
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
} from "../actions/constants/actions-ws/ws_orders-action-ws";
import { TFeed } from "../types/data";

export type TOrdersState = {
  wsConnected: boolean,
  orders: Array<TFeed>,
  total: number,
  totalToday: number,
  error: MessageEvent | null,
}

const initialState: TOrdersState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
}

export const ordersReducer = (state = initialState, action: TWsOrdersActions): TOrdersState => {
  switch (action.type) {
    case WS_ORDERS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        error: null,
      };

    case WS_ORDERS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        error: action.payload,
      };

    case WS_ORDERS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        error: null,
      };

    case WS_ORDERS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: null,
      };

    default:
      return state;
  }
};