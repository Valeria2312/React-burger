import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    GET_OPEN_MODAL,
    GET_CLOSE_MODAL,
    ADD_INGREDIENT,
    MOVE_INGREDIENT,
    DEL_INGREDIENT,
    ADD_BUN,
    DEL_INGREDIENTS, TIngridientActions, TOrderActions,
} from '../actions/BurgerConstructor'
import {IIngredient} from "../../types/typesDataProduct";


type TInitialStateConstructor = {
    ingredients: Array<IIngredient>,
    bun: IIngredient | null,
    number: number | null,
    isLoading: boolean,
    isError: boolean,
    showModal: boolean,
    hasData: boolean,
}

const initialState: TInitialStateConstructor = {
    ingredients: [],
    bun: null,
    number: null,
    isLoading: false,
    isError: false,
    showModal: false,
    hasData: false,
};

export const constructorReducer = (state = initialState, action:TIngridientActions): TInitialStateConstructor => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.data
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, {...action.data, key: action.key}]
            }
        }
        case DEL_INGREDIENT: {
            if (state.ingredients.length === 1) {
                return {
                    ...state,
                    ingredients: []
                };
            } else {
                return {
                    ...state,
                    ingredients: state.ingredients.filter((ingredient, index) => index !== action.index)
                };
            }
        }
        case MOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: action.sorted
                }
            }
        case DEL_INGREDIENTS: {
            return {
                hasData: false, isError: false, isLoading: false, number: null, showModal: false,
                ingredients: [],
                bun: null
            }
        }

        default: {
            return state
        }
    }
}

export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_ORDER_SUCCESS: {
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