import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { TWsFeedActions } from "../actions/actions-ws/ws_feed-action-ws";
import { TWsOrdersActions } from "../actions/actions-ws/ws_orders-action-ws";
import { TAuthActions } from "../actions/auth";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderDetailsActions } from "../actions/order-details";
import { rootReducer } from "../reducers/rootReducer";

type TApplicationActions =
	| TAuthActions
	| TConstructorActions
	| TIngredientsActions
	| TOrderDetailsActions
	| TWsFeedActions
	| TWsOrdersActions

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = Dispatch<TApplicationActions>; 
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();