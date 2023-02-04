import {rootReducer, TApplicationActions} from "../services/reducers";
import {ThunkAction} from "redux-thunk";
import {Action, ActionCreator} from "redux";
import {store} from "../index";
import {TypedUseSelectorHook, useDispatch, useSelector as selectorHook} from "react-redux";

export interface IIngredient {
     _id: string
     name: string
     type: string
     proteins: number
     fat: number
     carbohydrates: number
     calories: number
     price: number
     image: string
     image_mobile: string
     image_large: string
     __v: number
     uuid: string
    index: number
    key: any
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

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;