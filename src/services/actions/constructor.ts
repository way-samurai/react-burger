import { TIngredient } from "../types/data";
import { 
  CONSTRUCTOR_ADD_BUN, 
  CONSTRUCTOR_ADD_ITEM, 
  CONSTRUCTOR_DELETE_ITEM, 
  CONSTRUCTOR_MOVE_ITEM, 
  CONSTRUCTOR_RESET_ITEM 
} from "./constants/constructor";

export interface IConstructorDeleteItem {
  readonly type: typeof CONSTRUCTOR_DELETE_ITEM;
  readonly id: string;
}

export interface IConstructorAddBun {
  readonly type: typeof CONSTRUCTOR_ADD_BUN;
  readonly data: TIngredient;
}

export interface IConstructorAddItem {
  readonly type: typeof CONSTRUCTOR_ADD_ITEM;
  readonly data: TIngredient;
}

export interface IConstructorResetItem {
  readonly type: typeof CONSTRUCTOR_RESET_ITEM;
}

export interface IConstructorMoveItem {
  readonly type: typeof CONSTRUCTOR_MOVE_ITEM;
  readonly data: {
    dragIndex: number;
    hoverIndex: number;
  }
}

export type TConstructorActions = 
  | IConstructorDeleteItem
  | IConstructorAddBun
  | IConstructorAddItem
  | IConstructorResetItem
  | IConstructorMoveItem

export function deleteConstructorItem(id: string): IConstructorDeleteItem {
  return {
    type: CONSTRUCTOR_DELETE_ITEM,
    id: id,
  }
}

export function resetConstructor(): IConstructorResetItem {
  return {
    type: CONSTRUCTOR_RESET_ITEM,
  };
}



