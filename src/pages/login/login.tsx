import React, {SyntheticEvent, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect} from 'react-router-dom';
import StyleLogin from "./login.module.css"
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../services/actions/Registration";

export const Login = () => {

    // @ts-ignore
    const { user } = useSelector(store => store.RegisterUser);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const dispatch = useDispatch();

    const onChange = (e: SyntheticEvent) => {
        setForm({
            ...form,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        });
        console.log(form);
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const login = {
            email: form.email,
            password: form.password,
        }
        console.log(login)
        console.log("отправил запрос")
        // @ts-ignore
        dispatch(loginUser(login));
    };

    if (user) {
        return (
            <Redirect to='/profile'/>
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