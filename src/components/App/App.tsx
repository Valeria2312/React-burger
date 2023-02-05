import React, {useEffect} from 'react';
import StyleApp from './App.module.css'
import {AppHeader} from "../AppHeader/AppHeader";
import {BrowserRouter as Router, Switch, Route, useHistory, useLocation} from 'react-router-dom';
import {Location} from "history"
import {Login} from "../../pages/login/login";
import {Profile} from "../../pages/profile/profile";
import {Registration} from "../../pages/registration/registration";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Main} from "../../pages/main/main";
import {OrdersUser} from "../../pages/profile/orders/orders";
import {getUser} from "../../services/actions/Registration";
import {IngredientDetails} from "../IngredientDetails/IngredientDetails";
import {Modal} from "../Modal/Modal";
import {ProtectedRoute} from "../../pages/protected-route/protected-route";
import {CLOSE_CURRENT_PRODUCT} from "../../services/actions/BurgerIngridients";
import {OrderFeed} from "../../pages/feed/order-feed";
import {OrderInfo} from "../OrderInfo/OrderInfo";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

export const App = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const location = useLocation<{ background: Location, backgroundOrder: Location, backgroundProfileOrder: Location }>();
    const {user} = useAppSelector(store => store.RegisterUser);
    const background = location.state && location.state.background;
    const backgroundOrder = location.state && location.state.backgroundOrder;
    const backgroundProfileOrder = location.state && location.state.backgroundProfileOrder;
    const {currentProduct} = useAppSelector((store) => store.BurgerIngredients);

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
            <AppHeader/>
            <Switch location={background || backgroundOrder || backgroundProfileOrder || location}>
                <>
                    <main className={`${StyleApp.mainConstructor}`}>
                        <Route path="/" exact={true}>
                            <Main/>
                        </Route>
                        <Route path="/feed" exact={true}>
                            <OrderFeed/>
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
                        <Route path='/feed/:id' exact={true}>
                            <OrderInfo/>
                        </Route>
                        <Route path='/ingredients/:id' exact={true}>
                            <IngredientDetails/>
                        </Route>
                        <Route path='/profile/orders/:id' exact={true}>
                            <OrderInfo/>
                        </Route>
                    </main>
                </>
            </Switch>
            {background && (
                <Route path='/ingredients/:id' exact={true}>
                    {currentProduct && (
                        <Modal close={handleOnClose}>
                            <IngredientDetails/>
                        </Modal>
                    )}
                </Route>

            )}
            {backgroundOrder && (
                <Route path='/feed/:id' exact={true}>
                    <Modal close={handleOnClose}>
                        <OrderInfo/>
                    </Modal>
                </Route>
            )}
            {backgroundProfileOrder && (
                <Route path='/profile/orders/:id' exact={true}>
                    <Modal close={handleOnClose}>
                        <OrderInfo/>
                    </Modal>
                </Route>
            )}

        </div>

    );
}