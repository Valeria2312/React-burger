import {CheckResponse, requestAddress} from "../../Сonstants/ForQueries";
// import {GET_INGREDIENTS_FAILED} from "./BurgerIngridients";

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';
// export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
// export const DEL_INGREDIENT = 'DEL_INGREDIENT';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_OPEN_MODAL = "GET_OPEN_MODAL";
export const GET_CLOSE_MODAL = "GET_CLOSE_MODAL";


export function getOrderNumber(orderArr) {
    console.log(orderArr);
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST,
        });
        fetch(requestAddress + `/orders`, {
            method: 'POST',
            body: JSON.stringify({ingredients: orderArr}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then((res) => {
                console.log(res);
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
    };
}

// export function addIngredient(content, ingType) {
//     return function (dispatch) {
//         dispatch({
//             type: ADD_INGREDIENT,
//             content: { ...content, key: uuidv4() },
//             ingType,
//         })
//     }
// }