import {checkResponse, requestAddress} from "../../сonstants/ForQueries";
import {AppDispatch, IIngredient} from "../../types/typesDataProduct";

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

export const SHOW_CURRENT_PRODUCT: 'SHOW_CURRENT_PRODUCT' = 'SHOW_CURRENT_PRODUCT';
export const CLOSE_CURRENT_PRODUCT: 'CLOSE_CURRENT_PRODUCT' = 'CLOSE_CURRENT_PRODUCT';

export interface IGET_INGREDIENTS_REQUEST {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
    sorted: IIngredient;
}
export interface IGET_INGREDIENTS_SUCCESS {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: Array<IIngredient>;
}
export interface IGET_INGREDIENTS_FAILED {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ISHOW_CURRENT_PRODUCT {
    readonly type: typeof SHOW_CURRENT_PRODUCT;
    currentProduct: IIngredient;
}
export interface ICLOSE_CURRENT_PRODUCT {
    readonly type: typeof CLOSE_CURRENT_PRODUCT;
}

export type TIngridientsMenuActions =
    IGET_INGREDIENTS_REQUEST |
    IGET_INGREDIENTS_SUCCESS |
    IGET_INGREDIENTS_FAILED |
    ISHOW_CURRENT_PRODUCT |
    ICLOSE_CURRENT_PRODUCT;

// Получение ингридиентов
export const getIngredients = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        fetch(requestAddress + "/ingredients")
            .then(checkResponse)
            .then(res => {
                if (res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data,
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED,
                    })
                }
            }).catch(err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            })
        })
    }
}