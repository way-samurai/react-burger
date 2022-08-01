import { useState, useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyle from "./app.module.css";
import { getIngredients } from "../../utils/api/api";
import { IngredientsContext } from "../../services/ingredients-context";

function App() {
   const [state, setLoadedDataState] = useState({
     data: [],
     hasError: false,
     isLoading: true,
   });

  useEffect(() => {
    setLoadedDataState({ ...state, hasError: false, isLoading: true });
    getIngredients()
      .then((res) => {
        setLoadedDataState({ ...state, data: res.data, isLoading: false });
      })
      .catch((err) => {
        setLoadedDataState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <IngredientsContext.Provider value={state}>
        <main className={appStyle.main}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Произошла ошибка"}
          {!state.isLoading && !state.hasError && (
            <>
              <BurgerIngredients /> 
              <BurgerConstructor />
            </>
          )}
        </main>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
