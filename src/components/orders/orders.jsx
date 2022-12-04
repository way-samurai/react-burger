import { useSelector } from "../../services/types/index";
import { Link, useLocation } from "react-router-dom";
import { Preloader } from "../preloader/preloader";

import { OrderCard } from "./order-card/order-card";

import styles from "./orders.module.css";

export const Orders = () => {
  const location = useLocation();
  const { orders } = useSelector((store) => store.wsFeed);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <section className={`${styles.orderList}`}>
      {orders &&
        orders.map((order) => {
          return (
            <Link
              to={{
                pathname: `${location.pathname}/${order._id}`,
                state: { background: location },
              }}
              className={`${styles.link}`}
              key={order._id}
            >
              <OrderCard order={order} key={order._id} statusVue={false} />
            </Link>
          );
        })}
    </section>
  );
};
