import StyleForgotPassword from "./forgot-password.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect, SyntheticEvent} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {forgotPasswordRequest} from "../../services/actions/ForgotPassword";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const {forgotPasswordSuccess} = useAppSelector(store => store.ForgotPassword);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const forgot = (e: SyntheticEvent) => {
        e.preventDefault();
        const userEmail = {
            email: emailValue
        }
        dispatch(forgotPasswordRequest(userEmail));
        setEmailValue('');
    };

    useEffect (() => {
        if (forgotPasswordSuccess) {
            history.replace({ pathname: '/reset-password' });
        }
    }, [forgotPasswordSuccess, history]);
    return (
        <div className={`${StyleForgotPassword.form}`}>
            <p className={"text text_type_main-medium mb-6"}>
                Восстановление пароля
            </p>
            <form onSubmit={forgot}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    onChange={e => setEmailValue(e.target.value)}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">Восстановить
                </Button>
            </form>
            <div className={`${StyleForgotPassword.entrance} mt-20`}>
                <p>Вспимнили пароль?</p>
                <NavLink to={{ pathname: '/login' }}>Войти</NavLink>
            </div>
        </div>
    )
}