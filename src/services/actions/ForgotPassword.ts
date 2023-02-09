import {checkResponse, requestAddress} from "../../сonstants/ForQueries";
import {AppDispatch} from "../../types/typesDataProduct";
//сброс пароля
export const FORGOT_PASS_REQUEST: 'FORGOT_PASS_REQUEST' = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS: 'FORGOT_PASS_SUCCESS' = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAILED: 'FORGOT_PASS_FAILED' = 'FORGOT_PASS_FAILED';
//сохранение нового пароля
export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILED:  'RESET_PASS_FAILED' = 'RESET_PASS_FAILED';


export interface IFORGOT_PASS_REQUEST {
    readonly type: typeof FORGOT_PASS_REQUEST;
}
export interface IFORGOT_PASS_SUCCESS {
    readonly type: typeof FORGOT_PASS_SUCCESS;
}
export interface IFORGOT_PASS_FAILED {
    readonly type: typeof FORGOT_PASS_FAILED;
}
export interface IRESET_PASS_REQUEST {
    readonly type: typeof RESET_PASS_REQUEST;
}
export interface IRESET_PASS_SUCCESS {
    readonly type: typeof RESET_PASS_SUCCESS;
}
export interface IRESET_PASS_FAILED {
    readonly type: typeof RESET_PASS_FAILED;
}
export type TPassActions =
    IFORGOT_PASS_REQUEST |
    IFORGOT_PASS_SUCCESS |
    IFORGOT_PASS_FAILED |
    IRESET_PASS_REQUEST |
    IRESET_PASS_SUCCESS |
    IRESET_PASS_FAILED;


type TUserEmail = {
    email: string
}
export function forgotPasswordRequest(userEmail: TUserEmail) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASS_REQUEST
        });
        fetch(requestAddress + `/password-reset`, {
            method: 'POST',
            body: JSON.stringify(userEmail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
            .then(res => {
            if (res) {
                console.log(res);
                dispatch({
                    type: FORGOT_PASS_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: FORGOT_PASS_FAILED
                });
            }
        }).catch( err => {
            dispatch({
                type: FORGOT_PASS_FAILED
            });
        });
    };
}

type TNewPassword = {
    password: string,
    token: string
}

export function resetPasswordRequest(newPassword: TNewPassword) {
    return function(dispatch: AppDispatch) {
        dispatch({
            type: RESET_PASS_REQUEST
        });
        fetch(requestAddress + `/password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify(newPassword),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
            .then(res => {
            if (res) {
                console.log(res);
                dispatch({
                    type: RESET_PASS_SUCCESS,
                    user: res.user
                });
            } else {
                dispatch({
                    type: RESET_PASS_FAILED
                });
            }
        }).catch( err => {
            dispatch({
                type: RESET_PASS_FAILED
            });
        });
    };
}



