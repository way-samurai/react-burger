import { getIngredients } from '../../utils/api/api'
import { TIngredient } from '../types/data';
import { 
  GET_INGREDIENTS_FAILED, 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS 
} from './constants/ingredients';

export interface IIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: Array<TIngredient>
}

export type TIngredientsActions = 
  | IIngredientsRequest
  | IIngredientsFailed
  | IIngredientsSuccess

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      })
  };
}
