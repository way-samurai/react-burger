import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerContainer}`}>
        <nav>
          <div className={`${styles.listNavigation}`}>
            <Link to="/" className={`${styles.item} pr-5 pb-5 pt-5 mr-2`}>
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />

              <span
                className={
                  location.pathname === "/"
                    ? "text text_type_main-default pl-2"
                    : "text text_type_main-default text_color_inactive pl-2"
                }
              >
                Конструктор
              </span>
            </Link>

            <Link
              to="/feed"
              className={`${styles.item} pl-5 pr-5 pb-5 pt-5`}
            >
              <ListIcon
                type={location.pathname === "/feed" ? "primary" : "secondary"}
              />

              <span
                className={
                  location.pathname === "/feed"
                    ? "text text_type_main-default pl-2"
                    : "text text_type_main-default text_color_inactive pl-2"
                }
              >
                Лента заказов
              </span>
            </Link>
          </div>
        </nav>

        <Link to="/" className={`${styles.logo}`}>
          <Logo />
        </Link>

        <Link to="/profile" className={`${styles.profile}`}>
          <ProfileIcon
            type={
              (location.pathname === "/profile" ||
              location.pathname === "/profile/orders" ||
              location.pathname === "/login" ||
              location.pathname === "/register" ||
              location.pathname === "/forgot-password" ||
              location.pathname === "/reset-password")
                ? "primary"
                : "secondary"
            }
          />
          <span
            className={
              location.pathname === "/profile"
                ? "text text_type_main-default pl-2"
                : "text text_type_main-default text_color_inactive pl-2"
            }
          >
            Личный кабинет
          </span>
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
