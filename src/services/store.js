import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE,
} from "./action-types/ws_feed-action-types";

import {
  WS_ORDERS_CONNECTION_START,
  WS_ORDERS_CONNECTION_SUCCESS,
  WS_ORDERS_CONNECTION_ERROR,
  WS_ORDERS_CONNECTION_CLOSED,
  WS_ORDERS_GET_MESSAGE,
  WS_ORDERS_SEND_MESSAGE,
} from './action-types/ws_orders-action-types';

const feedWsActions = {
  wsInit: WS_FEED_CONNECTION_START,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onError: WS_FEED_CONNECTION_ERROR,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onMessage: WS_FEED_GET_MESSAGE,
  sendMessage: WS_FEED_SEND_MESSAGE,
}

const ordersWsActions = {
  wsInit: WS_ORDERS_CONNECTION_START,
  onOpen: WS_ORDERS_CONNECTION_SUCCESS,
  onError: WS_ORDERS_CONNECTION_ERROR,
  onClose: WS_ORDERS_CONNECTION_CLOSED,
  onMessage: WS_ORDERS_GET_MESSAGE,
  sendMessage: WS_ORDERS_SEND_MESSAGE,
}

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(ordersWsActions),
      socketMiddleware(feedWsActions),
    )
  )
);

export default store;
