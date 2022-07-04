import React from 'react';
import { data } from '../../utils/data';
import AppHeader from '../app-header/AppHeader';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import appStyle from './app.module.css';

function App() {
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>
        <BurgerIngredients data={data}/>
      </main>
    </div>
  );
}

export default App;
