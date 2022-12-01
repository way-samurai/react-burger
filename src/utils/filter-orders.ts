import { TFeed } from "../services/types/data";

export const filterOrders = (arr: Array<TFeed>) => {
    return arr?.reduce(
      (acc: { done: [] | TFeed[], pending: [] | TFeed[]}, curr) => {
        curr.status === "done"
          ? (acc.done = [...acc.done, curr])
          : (acc.pending = [...acc.pending, curr]);
        return acc;
      },
      { done: [], pending: [] }
    );
  };