import React, {useEffect, useState} from 'react';
import './App.css'
import { AppHeader } from "../AppHeader/AppHeader";
import { BurgerConstructor } from "../BurgerConstructor/BurgerConstructor";
import {BurgerIngredients} from "../BurgerIngredients/BurgerIngridients";
import {DataContext} from "../services/DataContext";
import {OrderContext} from "../services/OrderContext";


export const App = () => {

    const [state, setState] = useState({
        error: false,
        loading: false,
        data: []
    });
    const [order, showOrder] = React.useState({});


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
                <DataContext.Provider value={state}>
                <BurgerIngredients />
                    <OrderContext.Provider value={{order, showOrder}}>
                <BurgerConstructor />
                    </OrderContext.Provider>
                </DataContext.Provider>
            </div>
        </div>
    );
}