import {initialState, registerUserReducer} from "./Registration";
import * as action from '../actions/Registration'
import {testAithUser, testLoginUser, testRegUser, testUpdateUser,} from "../../utils/testData";

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
    test("should return order initial state", () => {
        expect(registerUserReducer(undefined, {})).toEqual(initialState)
    })
    test("should return the registered user", () => {
        expect(registerUserReducer(initialState, {
            type: action.REGISTER_USER_SUCCESS,
            user: testRegUser
        })).toEqual({
            ...initialState,
            user: testRegUser,
            registrationRequest: false,
            registrationFailed: false,
        })
    })
    test("should return a null value when registered user", () => {
        expect(registerUserReducer(initialState, {
            type: action.REGISTER_USER_FAILED,
            user: testRegUser
        })).toEqual({
            ...initialState,
            user: null,
            registrationRequest: false,
            registrationFailed: true,
        })
    })
    test("should return the login user", () => {
        expect(registerUserReducer(initialState, {
            type: action.LOGIN_USER_SUCCESS,
            user: testLoginUser
        })).toEqual({
            ...initialState,
            user: testLoginUser,
            loginRequest: false,
            loginFailed: false,
        })
    })
    test("should return a null value when login user", () => {
        expect(registerUserReducer(initialState, {
            type: action.LOGIN_USER_FAILED,
            user: testLoginUser
        })).toEqual({
            ...initialState,
            user: null,
            loginRequest: false,
            loginFailed: true,
        })
    })
    test("should return a null value when logout user", () => {
        expect(registerUserReducer(initialState, {
            type: action.LOGOUT_USER_SUCCESS,
        })).toEqual({
            ...initialState,
            user: null,
            logoutRequest: false,
            logoutFailed: false,
        })
    })
    test("should return the flags of the successful  token request", () => {
        expect(registerUserReducer(initialState, {
            type: action.TOKEN_USER_SUCCESS,
        })).toEqual({
            ...initialState,
            updateTokenRequest: false,
            updateTokenFailed: false,
        })
    })
    test("should return the flags of the failed  token request", () => {
        expect(registerUserReducer(initialState, {
            type: action.TOKEN_USER_FAILED,
        })).toEqual({
            ...initialState,
            updateTokenRequest: false,
            updateTokenFailed: true,
        })
    })
    test("should return the authenticated user", () => {
        expect(registerUserReducer(initialState, {
            type: action.AUTH_USER_SUCCESS,
            user: testAithUser,
        })).toEqual({
            ...initialState,
            user: testAithUser,
            authChecked: true,
        })
    })
    test("should return a null value when authenticated user", () => {
        expect(registerUserReducer(initialState, {
            type: action.AUTH_USER_FAILED,
            user: testAithUser,
        })).toEqual({
            ...initialState,
            user: null,
            authChecked: false,
        })
    })
    test("should return the update user", () => {
        expect(registerUserReducer(initialState, {
            type: action.UPDATE_USER_SUCCESS,
            user: testUpdateUser,
        })).toEqual({
            ...initialState,
            user: testUpdateUser,
            updateUserRequest: false,
            updateUserFailed: false,
        })
    })
    test("should return a null value when update user", () => {
        expect(registerUserReducer(initialState, {
            type: action.UPDATE_USER_FAILED,
            user: testUpdateUser,
        })).toEqual({
            ...initialState,
            user: null,
            updateUserRequest: false,
            updateUserFailed: true,
        })
    })
});