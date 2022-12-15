import React from 'react';
import './App.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngridients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";


export const App = () => {
    return (
        <div className="App">
            <AppHeader/>
            <div className="mainConstructor">
                    <BurgerIngredients/>
                    <BurgerConstructor/>
            </div>
        </div>
    );
}