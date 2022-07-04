import React from 'react';
import AppHeader from '../app-header/AppHeader';
import appStyle from './app.module.css';

function App() {
  return (
    <div className={appStyle.App}>
      <AppHeader />
      <main className={appStyle.main}>

      </main>
    </div>
  );
}

export default App;
