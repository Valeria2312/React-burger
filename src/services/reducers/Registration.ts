import {
    AUTH_USER_FAILED,
    AUTH_USER_REQUEST,
    AUTH_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAILED,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    TOKEN_USER_FAILED,
    TOKEN_USER_REQUEST,
    TOKEN_USER_SUCCESS, TUserActions, UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "../actions/Registration";
import {TUser} from "../../types/typesDataProduct";

type TInitialState = {
    user: TUser | null,

    registrationRequest: boolean,
    registrationFailed: boolean,

    loginRequest: boolean,
    loginFailed: boolean,
    authChecked: boolean,

    logoutRequest: boolean,
    logoutFailed: boolean,

    updateTokenRequest: boolean,
    updateTokenFailed: boolean,

    updateUserRequest: boolean,
    updateUserFailed: boolean,
}
const initialState: TInitialState = {
    user: null,

    registrationRequest: false,
    registrationFailed: false,

    loginRequest: false,
    loginFailed: false,
    authChecked: false,

    logoutRequest: false,
    logoutFailed: false,

    updateTokenRequest: false,
    updateTokenFailed: false,

    updateUserRequest: false,
    updateUserFailed: false,
}
export const registerUserReducer = (state = initialState, action: TUserActions): TInitialState => {
    switch (action.type) {
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                registrationFailed: false,
            };
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                registrationRequest: false,
                registrationFailed: false,
            };
        }
        case REGISTER_USER_FAILED: {
            return {
                ...initialState,
                user: initialState.user,
                registrationRequest: true,
                registrationFailed: true,
            };
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginFailed: false,
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                loginRequest: false,
                loginFailed: false,
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                user: initialState.user,
                loginRequest: false,
                loginFailed: true,
            }
        }
        case LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutFailed: false
            };
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                user: initialState.user,
                logoutRequest: false,
                logoutFailed: false
            };
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            };
        }
        case TOKEN_USER_REQUEST: {
            return {
                ...state,
                updateTokenRequest: true,
                updateTokenFailed: false
            };
        }
        case TOKEN_USER_SUCCESS: {
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: false
            };
        }
        case TOKEN_USER_FAILED: {
            return {
                ...state,
                updateTokenRequest: false,
                updateTokenFailed: true
            };
        }
        case AUTH_USER_REQUEST: {
            return {
                ...state,
                authChecked: false,
            };
        }
        case AUTH_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                authChecked: true,
            };
        }
        case AUTH_USER_FAILED: {
            return {
                ...state,
                user: initialState.user,
                authChecked: false,
            };
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: false,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.user,
                updateUserRequest: false,
                updateUserFailed: false,
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};
