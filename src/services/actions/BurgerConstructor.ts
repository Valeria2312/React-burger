import {checkResponse, requestAddress} from "../../сonstants/ForQueries";
import {AppDispatch, IIngredient} from "../../types/typesDataProduct";
import {getCookie} from "../../utils/cookie";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const DEL_INGREDIENT: 'DEL_INGREDIENT' = 'DEL_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
// export const DEL_BUN = 'DEL_BUN';
export const DEL_INGREDIENTS:'DEL_INGREDIENTS' = 'DEL_INGREDIENTS';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const GET_OPEN_MODAL: "GET_OPEN_MODAL" = "GET_OPEN_MODAL";
export const GET_CLOSE_MODAL: "GET_CLOSE_MODAL" = "GET_CLOSE_MODAL";

export interface IADD_INGREDIENT {
    readonly type: typeof ADD_INGREDIENT;
    data: IIngredient;
    key: string
}
export interface IMOVE_INGREDIENT {
    readonly type: typeof MOVE_INGREDIENT;
    sorted: Array<IIngredient>;
}
export interface IDEL_INGREDIENT {
    readonly type: typeof DEL_INGREDIENT;
    readonly index: number
}
export interface IADD_BUN {
    readonly type: typeof ADD_BUN;
    data: IIngredient;
}
export interface IDEL_INGREDIENTS {
    readonly type: typeof DEL_INGREDIENTS;
}
export interface IGET_ORDER_REQUEST {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGET_ORDER_SUCCESS {
    readonly type: typeof GET_ORDER_SUCCESS;
    number: number
}
export interface IGET_ORDER_FAILED {
    readonly type: typeof GET_ORDER_FAILED;
}
export interface IGET_OPEN_MODAL {
    readonly type: typeof GET_OPEN_MODAL;
}
export interface IGET_CLOSE_MODAL {
    readonly type: typeof GET_CLOSE_MODAL;
}

export type TIngridientActions =
    IADD_INGREDIENT |
    IMOVE_INGREDIENT |
    IDEL_INGREDIENT |
    IADD_BUN |
    IDEL_INGREDIENTS;

export type TOrderActions =
    IGET_ORDER_REQUEST |
    IGET_ORDER_SUCCESS |
    IGET_ORDER_FAILED |
    IGET_OPEN_MODAL |
    IGET_CLOSE_MODAL;


export function getOrderNumber(orderArr: string[] | undefined) {
    console.log(orderArr);
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        const token = getCookie('token');
        if(token) {
            fetch(requestAddress + `/orders`, {
                method: 'POST',
                body: JSON.stringify({ingredients: orderArr}),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
                .then(checkResponse)
                .then((res) => {
                    return res
                })
                .then((res) => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        number: res.order.number,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: GET_ORDER_FAILED,
                    });
                });
        }
    };
}