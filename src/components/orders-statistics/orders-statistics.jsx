import { useSelector } from "../../services/types/index";
import { filterOrders } from "../../utils/filter-orders";
import styles from "./orders-statistics.module.css";

export const OrdersStatistics = () => {
  const { total, totalToday, orders } = useSelector((store) => store.wsFeed);

  const statusArrays = filterOrders(orders);

  const doneStatusOrder = statusArrays?.done.slice(0, 30);
  const pendingStatusOrder = statusArrays?.pending.slice(0, 30);

  return (
    <section className={styles.container}>
      <div className={`${styles.orderBoard} pb-15`}>
        <div className={styles.column}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.orderList}>
            {doneStatusOrder.map((order) => {
              return (
                <li
                  className={`${styles.item} ${styles.done} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.orderList}>
            {pendingStatusOrder.map((order) => {
              return (
                <li
                  className={`${styles.item} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${styles.completed} pb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h2 className={`${styles.totalItems} text text_type_digits-large`}>
          {total}
        </h2>
      </div>
      <div className={styles.completed}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h2 className={`${styles.totalItems} text text_type_digits-large`}>
          {totalToday}
        </h2>
      </div>
    </section>
  );
};
