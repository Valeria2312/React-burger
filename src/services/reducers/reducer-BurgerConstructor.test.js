import {constructorReducer, initialState, orderReducer} from './BurgerConstructor'
import * as actions from '../actions/BurgerConstructor'
import {testIngredient, testIngredientsMove, testOrderNumber} from "../../utils/testData";
import {GET_ORDER_FAILED, GET_ORDER_REQUEST} from "../actions/BurgerConstructor";

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
        expect(constructorReducer(undefined, {})).toEqual(initialState)
    })
    test("should return order initial state", () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })
    test("the bun should return to the state after adding the ingredient bun", () => {
        expect(constructorReducer(initialState, {
            type: actions.ADD_BUN,
            data: testIngredient,
        })).toEqual({
            ...initialState,
            bun: testIngredient,
        })
    })
    test("the ingredients should return to the state after adding the ingredient", () => {
        expect(constructorReducer(initialState, {
            type: actions.ADD_INGREDIENT,
            data: testIngredient,
        })).toEqual({
            ...initialState,
            ingredients: [testIngredient],
        })
    })
    test("the ingredients should return to their original state after removing the ingredient", () => {
        expect(constructorReducer(initialState, {
            type: actions.DEL_INGREDIENT,
            data: testIngredient,
        })).toEqual({
            ...initialState,
            ingredients: [],
        })
    })
    test("the ingredients should return to their original state after moving the ingredient", () => {
        expect(constructorReducer(initialState, {
            type: actions.MOVE_INGREDIENT,
            sorted: testIngredientsMove,
        })).toEqual({
            ...initialState,
            ingredients: testIngredientsMove,
        })
    })
    test("the ingredients should be removed to their original state after removing the ingredients", () => {
        expect(constructorReducer(initialState, {
            type: actions.DEL_INGREDIENTS,
        })).toEqual({
            ingredients: [],
            bun: null,
            hasData: false,
            isError: false,
            isLoading: false,
            number: null,
            showModal: false,
        })
    })
    test("request getting the order number", () => {
        expect(orderReducer(initialState, {
            type: actions.GET_ORDER_REQUEST,
        })).toEqual({
            ...initialState,
            isLoading: true,
        })
    })
    test("getting the order number", () => {
        expect(orderReducer(initialState, {
            type: actions.GET_ORDER_SUCCESS,
            number: testOrderNumber
        })).toEqual({
            ...initialState,
            number: testOrderNumber,
            hasData: true,
        })
    })
    test("failed getting the order number", () => {
        expect(orderReducer(initialState, {
            type: actions.GET_ORDER_FAILED,
        })).toEqual({
            ...initialState,
            isError: true,
        })
    })
    test("the modal window is open", () => {
        expect(orderReducer(initialState, {
            type: actions.GET_OPEN_MODAL,
        })).toEqual({
            ...initialState,
            showModal: true,
        })
    })
    test("the modal window is close", () => {
        expect(orderReducer(initialState, {
            type: actions.GET_CLOSE_MODAL,
        })).toEqual({
            ...initialState,
            showModal: false,
        })
    })
});