import React from 'react';
import './App.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngridients";
import {BurgerConstructor} from "../BurgerConstructor/BurgerConstructor";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export const App = () => {
    return (
        <div className="App">
            <AppHeader/>
            <div className="mainConstructor">
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
        </div>
    );
}