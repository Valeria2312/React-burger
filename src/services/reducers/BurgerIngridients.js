import {
    CLOSE_CURRENT_PRODUCT,
    GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS, SHOW_CURRENT_PRODUCT
} from "../actions/BurgerIngridients";

const initialState = {
    ingredients: [],
    loading: false,
    isError: false,
    currentProduct: false,
}

//Редьюсер для ингридиентов
export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                isError: false,
                loading: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isError: true,
                loading: false,
            };
        }
        case SHOW_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: action.currentProduct,
            }
        }
        case CLOSE_CURRENT_PRODUCT: {
            return {
                ...state,
                currentProduct: false,
            }
        }
        default: {
            return state
        }
    }
}