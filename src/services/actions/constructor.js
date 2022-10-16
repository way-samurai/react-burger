export const CONSTRUCTOR_DELETE_ITEM = 'DELETE_ITEM';
export const CONSTRUCTOR_ADD_BUN = 'ADD_BUN';
export const CONSTRUCTOR_ADD_ITEM = 'ADD_ITEM';
export const CONSTRUCTOR_RESET_ITEM = 'RESET_ITEM';
export const CONSTRUCTOR_MOVE_ITEM = 'MOVE_ITEM';

export function resetConstructor() {
  return {
    type: CONSTRUCTOR_RESET_ITEM,
  };
}

