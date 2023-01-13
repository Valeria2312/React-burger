import React, {useEffect} from 'react';
import StyleApp from './App.module.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BrowserRouter as Router, Route, useHistory, useLocation} from 'react-router-dom';
import {Login} from "../../pages/login/login";
import {Profile} from "../../pages/profile/profile";
import {Registration} from "../../pages/registration/registration";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Main} from "../../pages/main/main";
import {OrdersUser} from "../../pages/profile/orders/orders";
import {getUser} from "../../services/actions/Registration";
import {useDispatch, useSelector} from "react-redux";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import {Modal} from "../Modal/Modal";
import {ProtectedRoute} from "../../pages/protected-route/protected-route";
import {CLOSE_CURRENT_PRODUCT} from "../../services/actions/BurgerIngridients";

export const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {user} = useSelector(store => store.RegisterUser);
    const background = location.state && location.state.background;
    const {currentProduct} = useSelector((store) => store.BurgerIngredients);

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [dispatch, user])

    const handleOnClose = () => {
        dispatch({
            type: CLOSE_CURRENT_PRODUCT,
            currentProduct: false,
        })
        history.goBack();
    }

    return (
        <div className={`${StyleApp.app}`}>
            <Router location={background || location}>
                <AppHeader/>
                <main className={`${StyleApp.mainConstructor}`}>
                    <Route path="/" exact={true}>
                        <Main/>
                    </Route>
                    <ProtectedRoute path="/login" exact={true}>
                        <Login/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/register" exact={true}>
                        <Registration/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/forgot-password" exact={true}>
                        <ForgotPassword/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/reset-password" exact={true}>
                        <ResetPassword/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile" exact={true}>
                        <Profile/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth path={`/profile/orders`} exact={true}>
                        <OrdersUser/>
                    </ProtectedRoute>
                    <Route path='/ingredients/:id' exact={true}>
                            <IngredientDetails/>
                    </Route>
                </main>
            </Router>
            {background && (
                <Route path='/ingredients/:id' exact={ true }>
                    { currentProduct && (
                        <Modal close={handleOnClose}>
                            <IngredientDetails />
                        </Modal>
                    )}
                </Route>
            )}
        </div>

    );
}