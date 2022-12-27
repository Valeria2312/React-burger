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
import {getCookie} from "../../utils/cookie";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import {Modal} from "../Modal/Modal";
import {ProtectedRoute} from "../../pages/protected-route/protected-route";

export const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const cookie = getCookie('token');
    const {user} = useSelector(store => store.RegisterUser);
    const background = location.state && location.state.background;

    useEffect(() => {
        if (!user) {
            dispatch(getUser())
        }
    }, [dispatch, user])

    const handleOnClose = () => {
        history.goBack()
    }
    return (
        <div className={`${StyleApp.app}`}>
            <Router>
                <AppHeader/>
                <main className={`${StyleApp.mainConstructor}`}>
                    <Route path="/" exact={true}>
                        <Main/>
                    </Route>
                    <ProtectedRoute onlyAuth={false} path="/login" exact={true}>
                        <Login/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={false} path="/register" exact={true}>
                        <Registration/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={false} path="/forgot-password" exact={true}>
                        <ForgotPassword/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={false} path="/reset-password" exact={true}>
                        <ResetPassword/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={false} path="/profile" exact={true}>
                        <Profile/>
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={false} path={`/profile/orders`} exact={true}>
                        <OrdersUser/>
                    </ProtectedRoute>
                </main>
            </Router>
            {background && (
                <Route path='/ingredients/:id'>
                    <Modal onClose={handleOnClose}>
                        <IngredientDetails/>
                    </Modal>
                </Route>
            )}
        </div>
    );
}