import React, {useEffect} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleQueryPassword from './reset-password.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
// import {resetPasswordRequest} from "../../services/actions/ForgotPassword";


export const ResetPassword = () => {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [codeValue, setCodeValue] = React.useState('');
    const {forgotPasswordSuccess, resetPasswordRequest} = useSelector(store => store.ForgotPassword);
    const dispatch = useDispatch();
    const history = useHistory();

       const reset = e => {
            e.preventDefault();
            console.log("Теперь придумай новый пароль")
            const newPassword = {
                password: passwordValue,
                token: codeValue
            }
            dispatch(resetPasswordRequest(newPassword));
           setPasswordValue('');
           setCodeValue('');
        };

        useEffect (() => {
            if (!forgotPasswordSuccess) {
                history.replace({ pathname: '/' });
            }
            if (resetPasswordRequest) {
                history.replace({ pathname: '/login' });
            }
        }, [forgotPasswordSuccess, history]);

    return (
        <div className={`${StyleQueryPassword.form}`}>
            <p className={"text text_type_main-medium mb-6"}>
                Восстановление пароля
            </p>
            <form onSubmit={reset}>
                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setPasswordValue(e.target.value)}
                    value={passwordValue}
                    icon={"ShowIcon"}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCodeValue(e.target.value)}
                    value={codeValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="button" type="primary" size="medium">Восстановить
                </Button>
            </form>
            <div className={`${StyleQueryPassword.entrance} mt-20`}>
                <p>Вспимнили пароль?</p>
                <a href="#">Войти</a>
            </div>
        </div>
    )

}