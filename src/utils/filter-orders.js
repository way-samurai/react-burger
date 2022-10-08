export const filterOrders = (arr) => {
    return arr?.reduce(
      (acc, curr) => {
        curr.status === "done"
          ? (acc.done = [...acc.done, curr])
          : (acc.pending = [...acc.pending, curr]);
        return acc;
      },
      { done: [], pending: [] }
    );
  };