import {
    FORGOT_PASS_FAILED,
    FORGOT_PASS_REQUEST,
    FORGOT_PASS_SUCCESS, RESET_PASS_FAILED,
    RESET_PASS_REQUEST, RESET_PASS_SUCCESS, TPassActions
} from "../actions/ForgotPassword";

type TInitialState = {
    forgotPasswordRequest: boolean,
    forgotPasswordSuccess: boolean,
    forgotPasswordError: boolean,
    resetPasswordRequest: boolean,
    resetPasswordSuccess: boolean,
    resetPasswordError: boolean
}
const initialState: TInitialState = {
    forgotPasswordRequest: false,
    forgotPasswordSuccess: false,
    forgotPasswordError: false,
    resetPasswordRequest: false,
    resetPasswordSuccess: false,
    resetPasswordError: false
}

export const forgotResetPassReducer = (state = initialState, action: TPassActions): TInitialState => {
    switch (action.type) {
        case FORGOT_PASS_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true
            };
        }
        case FORGOT_PASS_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                forgotPasswordSuccess: true,
                forgotPasswordError: false
            };
        }
        case FORGOT_PASS_FAILED: {
            return {
                ...initialState,
                forgotPasswordSuccess: false,
                forgotPasswordError: true
            };
        }
        case RESET_PASS_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordError: false
            };
        }
        case RESET_PASS_SUCCESS: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: true
            };
        }
        case RESET_PASS_FAILED: {
            return {
                ...state,
                resetPasswordRequest: false,
                resetPasswordSuccess: false,
                resetPasswordError: true
            };
        }
        default: {
            return state;
        }
    }
};