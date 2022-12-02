import React, {useEffect, useState} from 'react';
import './App.css'
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngridients";


 export const App = () => {

     const [state, setState] = useState({
         error: false,
         loading: false,
         data: []
     });

     useEffect(() => {
         const getData = () => {
             setState({ ...state, error: false, loading: true });
             fetch("https://norma.nomoreparties.space/api/ingredients")
                 .then((res) => {return res.json();})
                 .then((res) => {
                     setState({ ...state, data: res.data, loading: false });
                 })
                 .catch((err) => {
                     alert(err);
                     setState({ ...state, error: true, loading: false });
                 });
         };

         getData();
     }, []);

  return (
    <div className="App">
        <AppHeader />
        <div className="mainConstructor">
            <BurgerIngredients products={ state.data }/>
            <BurgerConstructor ingredients={ state.data }/>
        </div>
    </div>
  );
}
