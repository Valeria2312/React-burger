import React, {SyntheticEvent} from 'react';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import StyleRegistration from './registration.module.css'
import {Link, Redirect} from 'react-router-dom';
import {registerUserRequest} from "../../services/actions/Registration";
import {useDispatch, useSelector} from "react-redux";

export const Registration = () => {
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [passValue, setPassValue] = React.useState('');
    // const history = useHistory();
    const dispatch = useDispatch();
    // @ts-ignore
    const {user} = useSelector(store => store.RegisterUser);

    const registration = (e: SyntheticEvent) => {
        e.preventDefault();
        const userData = {
            email: emailValue,
            password: passValue,
            name: nameValue,
        }
        // @ts-ignore
        dispatch(registerUserRequest(userData));
        setEmailValue('');
        setPassValue('');
        setNameValue('');
    };

    if (user) {
        return (
            <Redirect to='/' />
        );
    }

    return (
        <div className={`${StyleRegistration.formRegistration}`}>
            <p className={"text text_type_main-medium mb-6"}>Регистрация</p>
            <form onSubmit={registration} className={`${StyleRegistration.form}`}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    icon={'EditIcon'}
                    value={nameValue}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={e => setEmailValue(e.target.value)}
                    icon={'EditIcon'}
                    value={emailValue}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassValue(e.target.value)}
                    icon={'EditIcon'}
                    value={passValue}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={`${StyleRegistration.entrance} mt-20`}>
                <p>Уже зарегистрированы?</p>
                <Link to={{ pathname: `/login` }}>Войти</Link>
            </div>
        </div>
    )
}