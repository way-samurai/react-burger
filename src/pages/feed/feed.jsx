import { useEffect } from "react";
import { useSelector, useDispatch } from "../../services/types/index";
import { OrdersStatistics } from "../../components/orders-statistics/orders-statistics";

import { Orders } from "../../components/orders/orders";
import { Preloader } from "../../components/preloader/preloader";
import { wsFeedConnectionClosed, wsFeedConnectionOpen } from "../../services/actions/actions-ws/ws_feed-action-ws";

import styles from "./feed.module.css";

export const Feed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsFeed.orders);

  useEffect(() => {
    dispatch(wsFeedConnectionOpen());
    return () => {
      dispatch(wsFeedConnectionClosed());
    };
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <div className={styles.feed}>
      <h2 className="text text_type_main-large pt-10 pb-5">Лента заказов</h2>
      <div className={styles.container}>
        <Orders />
        <OrdersStatistics />
      </div>
    </div>
  );
};
