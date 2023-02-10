import {ingredientsReducer} from "./BurgerIngridients";
import {initialState} from './BurgerIngridients'
// import {testIngredient} from "../../utils/testData";
import * as actions from '../actions/BurgerIngridients'
import {testBodyRequest, testIngredient, testIngredientsMove} from "../../utils/testData";
import {CLOSE_CURRENT_PRODUCT, SHOW_CURRENT_PRODUCT} from "../actions/BurgerIngridients";

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
    test("should return the ingredients from the request", () => {
        expect(ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: testBodyRequest,
        })).toEqual({
            ...initialState,
            ingredients: testBodyRequest,
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
