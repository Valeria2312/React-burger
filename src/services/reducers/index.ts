import {combineReducers} from "redux";
import {ingredientsReducer} from './BurgerIngridients'
import {constructorReducer, orderReducer} from "./BurgerConstructor";
import {forgotResetPassReducer} from "./ForgotPassword";
import {registerUserReducer} from "./Registration";
import {historyReducer} from "./wsHistoryReducer";
import {
    connect as WsConnectHistory,
    disconnect as disconnectHistory, TWsOrdersActions,
    wsClose as WsCloseHistory,
    wsError as WsErrorHistory,
    wsMessage as WsMessageHistory,
    wsOpen as WsOpenHistory
} from '../actions/wsHistoryActions'
import {
    connect as WsConnectHistoryUser,
    disconnect as disconnectHistoryUser, TWsOrdersUserActions,
    wsClose as WsCloseHistoryUser,
    wsError as WsErrorHistoryUser,
    wsMessage as WsMessageHistoryUser,
    wsOpen as WsOpenHistoryUser
} from '../actions/wsUserHistoryActions'
import {socketMiddlewareCreator} from "../socketMiddleware";
import {historyUserReducer} from "./wsUserHistoryReduser";
import {TIngridientActions, TOrderActions} from "../actions/BurgerConstructor";
import {TIngridientsMenuActions} from "../actions/BurgerIngridients";
import {TPassActions} from "../actions/ForgotPassword";
import {TUserActions} from "../actions/Registration";

export const rootReducer = combineReducers({
    BurgerIngredients: ingredientsReducer,
    BurgerConstructor: constructorReducer,
    OrderDetails: orderReducer,
    ForgotPassword: forgotResetPassReducer,
    RegisterUser: registerUserReducer,
    historyAll: historyReducer,
    UserHistory: historyUserReducer,
});


export type TApplicationActions = TIngridientActions | TOrderActions | TIngridientsMenuActions | TPassActions | TUserActions | TWsOrdersActions | TWsOrdersUserActions;

export const UserSocketMiddleware = socketMiddlewareCreator({
    wsConnect: WsConnectHistoryUser,
    wsDisconnect: disconnectHistoryUser,
    onOpen: WsOpenHistoryUser,
    onClose: WsCloseHistoryUser,
    onError: WsErrorHistoryUser,
    onMessage: WsMessageHistoryUser
});

export const SocketMiddleware = socketMiddlewareCreator({
    wsConnect: WsConnectHistory,
    wsDisconnect: disconnectHistory,
    onOpen: WsOpenHistory,
    onClose: WsCloseHistory,
    onError: WsErrorHistory,
    onMessage: WsMessageHistory
});