import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import {
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
  NotFound404,
  Profile,
} from "../../pages/index";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import { checkUzerAuth, getUserData } from "../../services/actions/auth";
import { Preloader } from "../preloader/preloader";
import { getCookie } from "../../utils/cookie/cookie";
import { Feed } from "../../pages/feed/feed";
import { OrderInfo } from "../order-info/order-info";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const background = location.state?.background;

  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const dataRequest = useSelector(
    (store) => store.burgerIngredients.dataRequest
  );
  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  const idOrderFeedInfo = useRouteMatch(["/feed/:id"])?.params?.id;
  const idOrderProfileInfo = useRouteMatch(["/profile/orders/:id"])?.params?.id;

  const handleCloseModal = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUzerAuth());
  }, [dispatch]);

  useEffect(() => {
    if (getCookie("token")) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact >
          <main className={appStyle.main}>
            {isLoading && <Preloader />}
            {hasError && "Произошла ошибка"}
            {!isLoading && !hasError && (
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
            )}
          </main>
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <ProtectedRoute path="/login" exact forNonAuthUsers={true}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact forNonAuthUsers={true}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact forNonAuthUsers={true}>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact forNonAuthUsers={true}>
          <ResetPassword />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          {!dataRequest ? (
            <Preloader />
          ) : (
            <div className={appStyle.container}>
              <h2
                className={`${appStyle.title} text text_type_main-large mt-4`}
              >
                Детали ингредиента
              </h2>
              <IngredientDetails />
            </div>
          )}
        </Route>
        <Route path="/feed/:id" exact>
          {!dataRequest ? <Preloader /> : <OrderInfo />}
        </Route>
        <ProtectedRoute
          path="/profile/orders/:id"
          exact
          forNonAuthUsers={false}
        >
          {!dataRequest ? <Preloader /> : <OrderInfo />}
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact forNonAuthUsers={false}>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact forNonAuthUsers={false}>
          <Profile />
        </ProtectedRoute>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id" exact>
          <Modal onClose={handleCloseModal} title="Детали ингредиента">
            {!dataRequest ? <Preloader /> : <IngredientDetails />}
          </Modal>
        </Route>
      )}

      {background && idOrderFeedInfo && (
        <Route path="/feed/:id" exact>
          <Modal onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        </Route>
      )}

      {background && idOrderProfileInfo && (
        <ProtectedRoute
          path="/profile/orders/:id"
          exact
          forNonAuthUsers={false}
        >
          <Modal onClose={handleCloseModal}>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
      )}
    </div>
  );
}

export default App;
