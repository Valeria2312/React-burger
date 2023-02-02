import {rootReducer, store} from "../services/reducers";
import {ThunkAction} from "redux-thunk";
import {Action, ActionCreator} from "redux";
import {TPassActions} from "../services/actions/ForgotPassword";

export interface IIngredient {
    readonly _id: string
    readonly name: string
    readonly type: string
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
     __v: number
     uuid: string
    index: number
}

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
};

export type TWSData = {
    success: boolean;
    orders: Array<TOrder>;
    total: 0;
    totalToday: 0;
};

export type TUser = {
    name: string,
    email: string,
    password?: string
}

type TApplicationActions = TPassActions;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
    >;