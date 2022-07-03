import React from 'react';
import AppHeader from '../app-header/AppHeader';
import AppStyle from './App.module.css';

function App() {
  return (
    <div className={AppStyle.App}>
      <AppHeader />
      <main className={AppStyle.main}>

      </main>
    </div>
  );
}

export default App;
