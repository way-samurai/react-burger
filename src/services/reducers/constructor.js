import {
  CONSTRUCTOR_ADD_BUN,
  CONSTRUCTOR_ADD_ITEM,
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_MOVE_ITEM,
  CONSTRUCTOR_RESET_ITEM,
} from '../actions/constructor'

const initialState = {
  bun: null, 
  ingredients: [],
};

export const constructorReducer = (state = initialState, action) => {
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
        bun: [],
      };
    }
    case CONSTRUCTOR_MOVE_ITEM: {
      const dragConstructor = [...state.items];
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