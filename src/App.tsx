import React from 'react';
import './App.css'
import { AppHeader } from "./components/AppHeader/AppHeader";
import { BurgerConstructor } from "./components/BurgerConstructor/BurgerConstructor";
import {BurgerIngredients} from "./components/BurgerIngredients/BurgerIngridients";
import { data } from "./utils/data";



function App() {

  return (
    <div className="App">
        <AppHeader />
        <div className="mainConstructor">
            <BurgerIngredients products={ data }/>
            <BurgerConstructor ingredients={ data }/>
        </div>
    </div>
  );
}

export default App;