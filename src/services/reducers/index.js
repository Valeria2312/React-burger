import {combineReducers} from "redux";
import {ingredientsReducer} from './BurgerIngridients'
import {constructorReducer, orderReducer} from "./BurgerConstructor";

export const rootReducer = combineReducers({
    BurgerIngredients: ingredientsReducer,
    BurgerConstructor: constructorReducer,
    OrderDetails: orderReducer,
});