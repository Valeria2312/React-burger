import React, {SyntheticEvent, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect, useLocation} from 'react-router-dom';
import StyleLogin from "./login.module.css"
import {loginUser} from "../../services/actions/Registration";
import {useAppDispatch, useAppSelector} from "../../types/typesDataProduct";

export const Login = () => {
    const { user } = useAppSelector(store => store.RegisterUser);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const dispatch = useAppDispatch();
    const location = useLocation();

    const onChange = (e: SyntheticEvent) => {
        setForm({
            ...form,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        });
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const login = {
            email: form.email,
            password: form.password,
        }
        dispatch(loginUser(login));
    };

    if (user) {
        return (
            // @ts-ignore
            <Redirect to={location?.state?.from || '/'}/>
        );
    }

    return (
        <div>
            <form onSubmit={onSubmit} className={`${StyleLogin.entrance}`}>
                <p className="text text_type_main-medium mb-6">
                    Вход
                </p>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    value={form.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type="password"
                    placeholder={'Пароль'}
                    onChange={onChange}
                    icon={'ShowIcon'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div>
                <div className={`${StyleLogin.registration}`}>
                    <p>Вы— новый пользователь?</p>
                    <NavLink to={{ pathname: '/register' }}>Зарегистрироваться</NavLink>
                </div>
                <div className={`${StyleLogin.recovery}`}>
                    <p>Забыли пароль?</p>
                    <NavLink to={{ pathname: '/forgot-password' }}>Восстановить пароль</NavLink>
                </div>
            </div>
        </div>
    )
}