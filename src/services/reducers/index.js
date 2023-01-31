import {combineReducers} from "redux";
import {ingredientsReducer} from './BurgerIngridients'
import {constructorReducer, orderReducer} from "./BurgerConstructor";
import {forgotResetPassReducer} from "./ForgotPassword";
import {registerUserReducer} from "./Registration";
import {historyReducer} from "./wsHistoryReducer";
import {userHistoryReducer} from "./wsUserHistoryReduser";

export const rootReducer = combineReducers({
    BurgerIngredients: ingredientsReducer,
    BurgerConstructor: constructorReducer,
    OrderDetails: orderReducer,
    ForgotPassword: forgotResetPassReducer,
    RegisterUser: registerUserReducer,
    historyAll: historyReducer,
    UserHistory: userHistoryReducer,
});