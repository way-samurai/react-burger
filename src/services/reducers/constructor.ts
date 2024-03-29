import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_MOVE_ITEM,
  CONSTRUCTOR_RESET_ITEM,
} from '../actions/constants/constructor'
import { TConstructorActions } from '../actions/constructor';
import { TConstructorIngredient, TIngredient } from '../types/data';

export type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[] 
}

const initialState: TConstructorState = {
  bun: null, 
  ingredients: [],
};

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
  switch (action.type) {
    case CONSTRUCTOR_DELETE_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(
          (item) => {
            return item.id !== action.id;
          }
        ),
      };
    }
    case CONSTRUCTOR_ADD_BUN: {
      return {
        ...state,
        bun: action.data,
      };
    }
    case CONSTRUCTOR_ADD_ITEM: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.data],
      };
    }
    case CONSTRUCTOR_RESET_ITEM: {
      return {
        ...state,
        ingredients: [],
        bun: null,
      };
    }
    case CONSTRUCTOR_MOVE_ITEM: {
      const dragConstructor = [...state.ingredients];
      dragConstructor.splice(
        action.data.dragIndex,
        0,
        dragConstructor.splice(action.data.hoverIndex, 1)[0]
      );

      return {
        ...state,
        ingredients: dragConstructor
      };
    }
    default: {
      return state;
    }
  }
};