import { 
  CONSTRUCTOR_ADD_BUN, 
  CONSTRUCTOR_ADD_ITEM, 
  CONSTRUCTOR_DELETE_ITEM, 
  CONSTRUCTOR_RESET_ITEM 
} from "./constants/constructor";

export interface IConstructorDeleteItem {
  readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
}

export interface IConstructorAddBun {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
}

export interface IConstructorAddItem {
  readonly type: typeof CONSTRUCTOR_ADD_ITEM;
}

export interface IConstructorResetItem {
  readonly type: typeof CONSTRUCTOR_RESET_ITEM;
}

export type TConstructorActions = 
  | IConstructorDeleteItem
  | IConstructorAddBun
  | IConstructorAddItem
  | IConstructorResetItem


export function resetConstructor() {
  return {
    type: CONSTRUCTOR_RESET_ITEM,
  };
}

