import {checkResponse, requestAddress} from "../../сonstants/ForQueries";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SHOW_CURRENT_PRODUCT = 'SHOW_CURRENT_PRODUCT';
export const CLOSE_CURRENT_PRODUCT = 'CLOSE_CURRENT_PRODUCT';



// Получение ингридиентов
export function getIngredients() {
    return function (dispatch) {
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