import {checkResponse, requestAddress} from "../../сonstants/ForQueries";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";


//регистрация пользовалеля
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
//выход
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED'
//авторизация
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED'
//обновление токена
export const TOKEN_USER_REQUEST = 'TOKEN_USER_REQUEST'
export const TOKEN_USER_SUCCESS = 'TOKEN_USER_SUCCESS'
export const TOKEN_USER_FAILED = 'TOKEN_USER_FAILED'
//получения данных о пользователе
export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILED = 'AUTH_USER_FAILED'
//обновление данных о пользователе
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED'

//регистрация пользовалеля
export function registerUserRequest(userData) {
    console.log(userData)
    return function (dispatch) {
        console.log("Я зарегистировался");
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
                console.log(res)
                if (res && res.success) {
                    const authToken = res.accessToken.split('Bearer')[1];
                    const refreshToken = res.refreshToken;
                    setCookie('token', authToken)
                    localStorage.setItem('refreshToken', refreshToken)
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
export function loginUser(login) {
    return function (dispatch) {
        console.log("Я вхожу")
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
                console.log(res)
                const authToken = res.accessToken.split('Bearer ')[1]
                const refreshToken = res.refreshToken
                setCookie('token', authToken)
                localStorage.setItem('refreshToken', refreshToken)
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    user: res.user,
                })
            })
            .catch((error) => {
                console.log("что то пошло не так")
                dispatch({
                    type: LOGIN_USER_FAILED,
                })
            })
    }
}
//выход
export function logoutUser() {
    return function (dispatch) {
        console.log("Я выхожу")
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
export function updateToken() {
    return function (dispatch) {
        dispatch({
            type: TOKEN_USER_REQUEST
        });
        fetch(requestAddress + `/auth/token`, {
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkResponse)
            .then(res => {
                const authToken = res.accessToken.split('Bearer ')[1]
                const refreshToken = res.refreshToken
                setCookie('token', authToken)
                localStorage.setItem('refreshToken', refreshToken)
                dispatch({
                    type: TOKEN_USER_SUCCESS
                });
                dispatch(getUser());
            })
            .catch(err => {
                dispatch({
                    type: TOKEN_USER_FAILED,
                    err
                });
            })
    };
}
//получения данных о пользователе
export function getUser() {
    return function (dispatch) {
        console.log("получил данные о пользователе")
        dispatch({
            type: AUTH_USER_REQUEST,
            authChecked: false,
        });
        fetch(requestAddress + `/auth/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + getCookie('token')
            }
        }).then(checkResponse)
            .then(res => {
                if(res && res.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        user: res.user,
                    });
                }
            })
            .catch(err => {
                if (err.message === 'jwt expired') {
                    dispatch(updateToken());
                }
                dispatch({
                    type: AUTH_USER_FAILED,
                    err
                });
            })
    };
}
//обновление данных о пользователе
export function updateUser(updateForm) {
    console.log("Обновил данные о пользователе")
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        });
        fetch(requestAddress + `/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify(
                updateForm)
        }).then(checkResponse)
            .then(res => {
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
    };
}