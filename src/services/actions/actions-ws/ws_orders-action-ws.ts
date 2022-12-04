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
  readonly payload: MessageEvent;
}

export interface IWsOrdersConnectionClosed {
  readonly type: typeof WS_ORDERS_CONNECTION_CLOSED;
  readonly payload: CloseEvent;
}

export interface IWsOrdersGetMessage {
  readonly type: typeof WS_ORDERS_GET_MESSAGE;
  readonly payload: Array<TOrder>; //Проверить
}

export interface IWsOrdersSendMessage {
  readonly type: typeof WS_ORDERS_SEND_MESSAGE;
  readonly payload: Array<TOrder>;
}

export type TWsOrdersActions = 
  | IWsOrdersSuccess
  | IWsOrdersConnectionStart
  | IWsOrdersConnectionError
  | IWsOrdersConnectionClosed
  | IWsOrdersGetMessage
  | IWsOrdersSendMessage

export const wsOrdersConnectionSuccess = (): IWsOrdersSuccess => {
	return {
		type: WS_ORDERS_CONNECTION_SUCCESS
	};
};

export const wsOrdersConnectionOpen = (): IWsOrdersConnectionStart => {
	return {
		type: WS_ORDERS_CONNECTION_START
	}
}

export const wsOrdersConnectionError = (message: MessageEvent): IWsOrdersConnectionError => {
	return {
		type: WS_ORDERS_CONNECTION_ERROR,
    payload: message
	};
};

export const wsOrdersConnectionClosed = (event: CloseEvent): IWsOrdersConnectionClosed => {
	return {
		type: WS_ORDERS_CONNECTION_CLOSED,
    payload: event
	};
};

export const wsOrdersGetMessage = (order: Array<TOrder>): IWsOrdersGetMessage => {
	return {
		type: WS_ORDERS_GET_MESSAGE,
		payload: order
	};
};

export const wsOrdersSendMessage = (order: Array<TOrder>): IWsOrdersSendMessage => {
	return {
		type: WS_ORDERS_SEND_MESSAGE,
		payload: order
	};
};