import React, {useState} from 'react';
import StyleProfile from "./profile.module.css"
import {NavLink, Redirect} from "react-router-dom";
import {logoutUser, updateUser} from "../../services/actions/Registration";
import {useDispatch, useSelector} from "react-redux";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.RegisterUser);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    if (!user) {
        return (
            <Redirect to='/login' />
        );
    }

    const onLogOut = () => {
        dispatch(logoutUser())
    }

    const onChange = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log(form);
    };

    const handleSubmit = () => {
        const updateForm = {
            name: form.name,
            email: form.email,
            password: form.password,
        }
        dispatch(updateUser(updateForm))
    }
    const handleSubmitCancel = () => {
        setForm ({
            name: form.name,
            email: form.email,
            password: form.password,
        })
    }

    return (
        <div className={`${StyleProfile.main} mt-30`}>
            <div className={`${StyleProfile.calculations}`}>
                <NavLink  to='/profile' activeClassName={`${StyleProfile.link_active}`} className={`${StyleProfile.link} text text_type_main-medium`}>Профиль</NavLink>
                <NavLink  to='/profile/orders' activeClassName={`${StyleProfile.link_active}`} className={`${StyleProfile.link} text text_type_main-medium`}>История заказов</NavLink>
                <NavLink  to='/login' onClick={onLogOut} className={`${StyleProfile.link} text text_type_main-medium`}>Выход</NavLink>
                <p className={"text text_type_main-default text_color_inactive mt-20"}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
            <form className={`${StyleProfile.form}`}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"
                />
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="mb-6"

                />
                <Button htmlType="button" size="medium" onClick={() => handleSubmit()}>Сохранить</Button>
                <Button htmlType="button" size="medium" onClick={() => handleSubmitCancel()}>Отменить</Button>
            </form>
        </div>

    )
}