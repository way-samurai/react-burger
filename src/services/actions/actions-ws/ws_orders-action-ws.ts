import { TOrder } from "../../types/data";
import { 
  WS_ORDERS_CONNECTION_CLOSED, 
  WS_ORDERS_CONNECTION_ERROR, 
  WS_ORDERS_CONNECTION_START, 
  WS_ORDERS_CONNECTION_SUCCESS, 
  WS_ORDERS_GET_MESSAGE, 
  WS_ORDERS_SEND_MESSAGE 
} from "../constants/actions-ws/ws_orders-action-ws";

export interface IWsOrdersSuccess {
  readonly type: typeof WS_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsOrdersConnectionStart {
  readonly type: typeof WS_ORDERS_CONNECTION_START;
}

export interface IWsOrdersConnectionError {
  readonly type: typeof WS_ORDERS_CONNECTION_ERROR;
}

export interface IWsOrdersConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
}

export interface IWsOrdersGetMessage {
  readonly type: typeof WS_ORDERS_GET_MESSAGE;
  readonly payload: TOrder;
}

export interface IWsOrdersSendMessage {
  readonly type: typeof WS_ORDERS_SEND_MESSAGE;
  readonly payload: TOrder;
}

export type TWsOrdersActions = 
  | IWsOrdersSuccess
  | IWsOrdersConnectionStart
  | IWsOrdersConnectionError
  | IWsOrdersConnectionClosed
  | IWsOrdersGetMessage
  | IWsOrdersSendMessage

export const wsOrdersConnectionSuccess = () => {
	return {
		type: WS_ORDERS_CONNECTION_SUCCESS
	};
};

export const wsOrdersConnectionOpen = () => {
	return {
		type: WS_ORDERS_CONNECTION_START
	}
}

export const wsOrdersConnectionError = () => {
	return {
		type: WS_ORDERS_CONNECTION_ERROR
	};
};

export const wsOrdersConnectionClosed = () => {
	return {
		type: WS_ORDERS_CONNECTION_CLOSED
	};
};

export const wsOrdersGetMessage = (order: Array<TOrder>) => {
	return {
		type: WS_ORDERS_GET_MESSAGE,
		payload: order
	};
};

export const wsOrdersSendMessage = (order: Array<TOrder>) => {
	return {
		type: WS_ORDERS_SEND_MESSAGE,
		payload: order
	};
};