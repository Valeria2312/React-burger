import {forgotResetPassReducer, initialState} from "./ForgotPassword";
import * as actions from '../actions/ForgotPassword'
import {FORGOT_PASS_FAILED, FORGOT_PASS_REQUEST} from "../actions/ForgotPassword";

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
        expect(forgotResetPassReducer(undefined, {})).toEqual(initialState)
    })
    test('should return the flags forgot password request', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.FORGOT_PASS_REQUEST,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: true
        })
    })
    test('should return the flags of the successful forgot password request', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.FORGOT_PASS_SUCCESS,
        })).toEqual({
            ...initialState,
            forgotPasswordRequest: false,
            forgotPasswordSuccess: true,
            forgotPasswordError: false
        })
    })
    test('should return the flags forgot password failed', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.FORGOT_PASS_FAILED,
        })).toEqual({
            ...initialState,
            forgotPasswordSuccess: false,
            forgotPasswordError: true
        })
    })
    test('should return the flags of the failed  forgot password request', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.RESET_PASS_REQUEST,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: true,
            resetPasswordError: false
        })
    })
    test('should return the flags of the successful reset password request', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.RESET_PASS_SUCCESS,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordSuccess: true
        })
    })
    test('should return the flags of the failed  reset password request', () => {
        expect(forgotResetPassReducer(initialState, {
            type: actions.RESET_PASS_FAILED,
        })).toEqual({
            ...initialState,
            resetPasswordRequest: false,
            resetPasswordSuccess: false,
            resetPasswordError: true
        })
    })
});