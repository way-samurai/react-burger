import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/ingredients";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { ForgotPassword, Login, Register, ResetPassword, NotFound404, Profile } from '../../pages/index';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import { checkUzerAuth } from "../../services/actions/auth";
import { Preloader } from "../preloader/preloader";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const background = location.state?.background;

  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);

  const hasError = useSelector((store) => store.burgerIngredients.hasError);

  const handleCloseModal = () => {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getBurgerIngredients());
    dispatch(checkUzerAuth());
  }, [dispatch]);

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path="/" exact forNonAuthUsers={false}>
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
        </ProtectedRoute>
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
          <div className={appStyle.container}>
            <h2 className={`${appStyle.title} text text_type_main-large mt-4`}>
              Детали ингредиента
            </h2>
            <IngredientDetails />
          </div>
        </Route>
        <ProtectedRoute path="/profile" forNonAuthUsers={false}>
          <Profile />
        </ProtectedRoute>
        <Route path="*">
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={handleCloseModal} title="Детали ингредиента">
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
}

export default App;
