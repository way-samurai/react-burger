import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burgerIngredients.isLoading);
  const hasError = useSelector((store) => store.burgerIngredients.hasError);
  
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);
  
  return (
    <div className={appStyle.app}>
      <AppHeader />
        <main className={appStyle.main}>
          {isLoading && "Загрузка..."}
          {hasError && "Произошла ошибка"}
          {!isLoading && !hasError && (
            <>
              <BurgerIngredients /> 
              <BurgerConstructor />
            </>
          )}
        </main>
    </div>
  );
}

export default App;
