import { getIngredients } from '../../utils/api/api'
import { 
  GET_INGREDIENTS_FAILED, 
  GET_INGREDIENTS_REQUEST, 
  GET_INGREDIENTS_SUCCESS 
} from './constants/ingredients';

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
