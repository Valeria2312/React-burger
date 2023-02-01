import {combineReducers} from "redux";
import {ingredientsReducer} from './BurgerIngridients'
import {constructorReducer, orderReducer} from "./BurgerConstructor";
import {forgotResetPassReducer} from "./ForgotPassword";
import {registerUserReducer} from "./Registration";
import {historyReducer} from "./wsHistoryReducer";
import {configureStore} from "@reduxjs/toolkit";
import {connect as WsConnectHistory,
    disconnect as disconnectHistory,
    wsClose as WsCloseHistory,
    wsError as WsErrorHistory,
    wsMessage as WsMessageHistory,
    wsOpen as WsOpenHistory} from '../actions/wsHistoryActions'
import {socketMiddlewareCreator} from "../socketMiddleware";

export const rootReducer = combineReducers({
    BurgerIngredients: ingredientsReducer,
    BurgerConstructor: constructorReducer,
    OrderDetails: orderReducer,
    ForgotPassword: forgotResetPassReducer,
    RegisterUser: registerUserReducer,
    historyAll: historyReducer,
    // UserHistory: userHistoryReducer,
});

const SocketMiddleware = socketMiddlewareCreator({
    wsConnect: WsConnectHistory,
    wsDisconnect: disconnectHistory,
    onOpen: WsOpenHistory,
    onClose: WsCloseHistory,
    onError: WsErrorHistory,
    onMessage: WsMessageHistory
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)  => {
        return getDefaultMiddleware().concat(SocketMiddleware)
    }
})