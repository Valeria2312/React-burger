import React, {SyntheticEvent} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleQueryPassword from './reset-password.module.css'
import {NavLink, useHistory, Redirect} from "react-router-dom";
import {resetPasswordRequest} from "../../services/actions/ForgotPassword";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";


export const ResetPassword = () => {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [codeValue, setCodeValue] = React.useState('');
    const {forgotPasswordSuccess} = useAppSelector(store => store.ForgotPassword);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const reset = (e: SyntheticEvent) => {
        e.preventDefault();
        const newPassword = {
            password: passwordValue,
            token: codeValue
        }
        dispatch(resetPasswordRequest(newPassword));
        history.replace({pathname: '/login'});
        setPasswordValue('');
        setCodeValue('');
    };
    if (!forgotPasswordSuccess) {
        return <Redirect to={{pathname: "/forgot-password"}}/>;
    }

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
                <Button htmlType="submit" type="primary" size="medium">Восстановить
                </Button>
            </form>
            <div className={`${StyleQueryPassword.entrance} mt-20`}>
                <p>Вспимнили пароль?</p>
                <NavLink to={{pathname: '/login'}}>Войти</NavLink>
            </div>
        </div>
    )

}