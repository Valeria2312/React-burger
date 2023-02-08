import fetchWithRefresh, {checkResponse, requestAddress} from "../../сonstants/ForQueries";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
import {AppDispatch, TUser} from "../../types/typesDataProduct";

//регистрация пользовалеля
export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST'  = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';
//выход
export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_FAILED' = 'LOGOUT_USER_FAILED'
//авторизация
export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED'
//обновление токена
export const TOKEN_USER_REQUEST: 'TOKEN_USER_REQUEST' = 'TOKEN_USER_REQUEST'
export const TOKEN_USER_SUCCESS: 'TOKEN_USER_SUCCESS' = 'TOKEN_USER_SUCCESS'
export const TOKEN_USER_FAILED: 'TOKEN_USER_FAILED' = 'TOKEN_USER_FAILED'
//получения данных о пользователе
export const AUTH_USER_REQUEST: 'AUTH_USER_REQUEST' = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS: 'AUTH_USER_SUCCESS' = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILED: 'AUTH_USER_FAILED' = 'AUTH_USER_FAILED'
//обновление данных о пользователе
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED'

export interface IREGISTER_USER_REQUEST {
    readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IREGISTER_USER_SUCCESS {
    readonly type: typeof REGISTER_USER_SUCCESS;
    user: TUser;
}
export interface IREGISTER_USER_FAILED {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface ILOGOUT_USER_REQUEST {
    readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILOGOUT_USER_SUCCESS {
    readonly type: typeof LOGOUT_USER_SUCCESS;
}
export interface ILOGOUT_USER_FAILED {
    readonly type: typeof LOGOUT_USER_FAILED;
}

export interface ILOGIN_USER_REQUEST {
    readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILOGIN_USER_SUCCESS {
    readonly type: typeof LOGIN_USER_SUCCESS;
    user: TUser;
}
export interface ILOGIN_USER_FAILED {
    readonly type: typeof LOGIN_USER_FAILED;
}

export interface ITOKEN_USER_REQUEST {
    readonly type: typeof TOKEN_USER_REQUEST;
}
export interface ITOKEN_USER_SUCCESS {
    readonly type: typeof TOKEN_USER_SUCCESS;
}
export interface ITOKEN_USER_FAILED {
    readonly type: typeof TOKEN_USER_FAILED;
}

export interface IAUTH_USER_REQUEST {
    readonly type: typeof AUTH_USER_REQUEST;
}
export interface IAUTH_USER_SUCCESS {
    readonly type: typeof AUTH_USER_SUCCESS;
    user: TUser;
}
export interface IAUTH_USER_FAILED {
    readonly type: typeof AUTH_USER_FAILED;
}

export interface IUPDATE_USER_REQUEST {
    readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUPDATE_USER_SUCCESS {
    readonly type: typeof UPDATE_USER_SUCCESS;
    user: TUser;
}
export interface IUPDATE_USER_FAILED {
    readonly type: typeof UPDATE_USER_FAILED;
}

export type TUserActions =
    IREGISTER_USER_REQUEST |
    IREGISTER_USER_SUCCESS |
    IREGISTER_USER_FAILED |
    ILOGOUT_USER_REQUEST |
    ILOGOUT_USER_SUCCESS |
    ILOGOUT_USER_FAILED |
    ILOGIN_USER_REQUEST |
    ILOGIN_USER_SUCCESS |
    ILOGIN_USER_FAILED |
    ITOKEN_USER_REQUEST |
    ITOKEN_USER_SUCCESS |
    ITOKEN_USER_FAILED |
    IAUTH_USER_REQUEST |
    IAUTH_USER_SUCCESS |
    IAUTH_USER_FAILED |
    IUPDATE_USER_REQUEST |
    IUPDATE_USER_SUCCESS |
    IUPDATE_USER_FAILED;



type TUserData = {
    email: string,
    password: string,
    name: string,
}
 type TLogin = {
     email: string,
     password: string,
 }

//регистрация пользовалеля
export function registerUserRequest(userData: TUserData) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTER_USER_REQUEST
        });
        fetch(requestAddress + `/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    localStorage.setItem("refreshToken", res.refreshToken);
                    setCookie('token', res.accessToken);
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        user: res.user,
                    })
                } else {
                    console.log(res.message)
                    dispatch({
                        type: REGISTER_USER_FAILED,
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: REGISTER_USER_FAILED,
                })
                console.log(error)
            })
    }
}

//авторизация
export function loginUser(login: TLogin) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_USER_REQUEST,
        })
        fetch(requestAddress + `/auth/login`, {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
            .then((res) => {
                localStorage.setItem("refreshToken", res.refreshToken);
                setCookie('token', res.accessToken);
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: res.user,
                })
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_USER_FAILED,
                })
            })
    }
}

//выход
export function logoutUser() {
    console.log(requestAddress + `/auth/logout`)
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
        fetch(requestAddress + `/auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    deleteCookie("token")
                    localStorage.removeItem("refreshToken");
                    dispatch({
                        type: LOGOUT_USER_SUCCESS
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: LOGOUT_USER_FAILED,
                    err
                });
            })
    }
}

//обновление токена
export async function updateToken() {
    return await fetch(requestAddress + `/auth/token`, {
        method: "POST",
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse)
        .then((res) => {
            return res;
        });
}

//получения данных о пользователе
export function getUser() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: AUTH_USER_REQUEST,
            authChecked: false,
        });
        const token = getCookie('token')
        if(token) {
            fetchWithRefresh(requestAddress + `/auth/user`, {
                method: "GET",
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            }).then(res => {
                if(res && res.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        user: res.user,
                    });
                }
            })
                .catch(err => {
                    dispatch({
                        type: AUTH_USER_FAILED,
                        err
                    });
                })
        }
    };
}

type TUpdateForm = {
    name: string,
    email: string,
    password:string,
}
//обновление данных о пользователе
export function updateUser(updateForm: TUpdateForm) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        const token = getCookie('token');
        if(token) {
            fetchWithRefresh(requestAddress + `/auth/user`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                },
                body: JSON.stringify(
                    updateForm)
            }).then(res => {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: res.user,
                });
            })
                .catch(err => {
                    dispatch({
                        type: UPDATE_USER_FAILED,
                        err
                    });
                })
        }

    };
}

