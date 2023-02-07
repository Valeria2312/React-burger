import StyleProfile from "../profile.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {updateUser} from "../../../services/actions/Registration";
import {useAppDispatch, useAppSelector} from "../../../types/typesDataProduct";


export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store.RegisterUser);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    useEffect(() => {
        if(user && user.name && user.email) {
            setForm({
                name: user.name,
                email: user.email,
                password: user.password ? user.password : '',
            })
        }
    }, [user])
    const onChange = (e: SyntheticEvent) => {
        setForm({
            ...form,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        });
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
    return(
        <form className={`${StyleProfile.form} mt-25`}>
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
    )
}
