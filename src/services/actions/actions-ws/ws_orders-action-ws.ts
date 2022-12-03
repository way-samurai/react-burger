import { 
  WS_ORDERS_CONNECTION_CLOSED, 
  WS_ORDERS_CONNECTION_ERROR, 
  WS_ORDERS_CONNECTION_START, 
  WS_ORDERS_CONNECTION_SUCCESS, 
  WS_ORDERS_GET_MESSAGE, 
  WS_ORDERS_SEND_MESSAGE 
} from "../constants/actions-ws/ws_orders-action-ws";

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

export const wsOrdersGetMessage = order => {
	return {
		type: WS_ORDERS_GET_MESSAGE,
		payload: order
	};
};

export const wsOrdersSendMessage = order => {
	return {
		type: WS_ORDERS_SEND_MESSAGE,
		payload: order
	};
};