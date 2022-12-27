import {requestAddress} from "../../сonstants/ForQueries";
//сброс пароля
export const FORGOT_PASS_REQUEST = 'FORGOT_PASS_REQUEST';
export const FORGOT_PASS_SUCCESS = 'FORGOT_PASS_SUCCESS';
export const FORGOT_PASS_FAILED = 'FORGOT_PASS_FAILED';
//сохранение нового пароля
export const RESET_PASS_REQUEST = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILED = 'RESET_PASS_FAILED';


export function forgotPasswordRequest(userEmail) {
    return function(dispatch) {
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

export function resetPasswordRequest(userEmail) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASS_REQUEST
        });
        fetch(requestAddress + `/password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify(userEmail),
            headers: {
                'Content-Type': 'application/json'
            }
        })
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



