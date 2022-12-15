import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_OPEN_MODAL,
    GET_CLOSE_MODAL,
} from '../actions/BurgerConstructor'

const initialState = {
    number: null,
    isLoading: false,
    isError: false,
    showModal: false,
    hasData: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_ORDER_SUCCESS: {
            console.log("это ред")
            console.log(action);
            return {
                ...state,
                number: action.number,
                hasData: true,
            }
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                isError: true,
            }
        }
        case GET_OPEN_MODAL: {
            return {
                ...state,
                showModal: true,
            }
        }
        case GET_CLOSE_MODAL: {
            return {
                ...state,
                showModal: false,
            }
        }
        default: {
            return state
        }
    }
}