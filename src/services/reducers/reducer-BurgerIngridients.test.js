import {ingredientsReducer} from "./BurgerIngridients";
import {initialState} from './BurgerIngridients'
import * as actions from '../actions/BurgerIngridients'
import {testBodyRequest, testIngredient} from "../../utils/testData";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST} from "../actions/BurgerIngridients";

describe("Redux store and actions", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockRejectedValue({
            json: jest.fn().mockRejectedValue({result: "OK"}),
            ok: true,
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("should return constructor initial state", () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState)
    })
    test("request for ingredients", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_REQUEST,
        })).toEqual({
            ...initialState,
            loading: true
        })
    })
    test("ingredients from the request", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: testBodyRequest,
        })).toEqual({
            ...initialState,
            ingredients: testBodyRequest,
        })
    })
    test("faild for ingredients", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_FAILED,
        })).toEqual({
            ...initialState,
            isError: true,
            loading: false,
        })
    })
    test("should return current product", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.SHOW_CURRENT_PRODUCT,
            currentProduct: testIngredient,
        })).toEqual({
            ...initialState,
            currentProduct: testIngredient,
        })
    })
    test("should return null product", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.CLOSE_CURRENT_PRODUCT,
        })).toEqual({
            ...initialState,
            currentProduct: null,
        })
    })
});
