import {combineReducers} from "redux";
import {ingredientsReducer} from './BurgerIngridients'
import {constructorReducer, orderReducer} from "./BurgerConstructor";
import {forgotResetPassReducer} from "./ForgotPassword";
import {registerUserReducer} from "./Registration";

export const rootReducer = combineReducers({
    BurgerIngredients: ingredientsReducer,
    BurgerConstructor: constructorReducer,
    OrderDetails: orderReducer,
    ForgotPassword: forgotResetPassReducer,
    RegisterUser: registerUserReducer,
});