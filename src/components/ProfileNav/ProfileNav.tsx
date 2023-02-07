import {NavLink} from "react-router-dom";
import React from "react";
import {logoutUser} from "../../services/actions/Registration";
import {useAppDispatch} from "../../types/typesDataProduct";
import StyleProfile from "../ProfileNav/ProfileNav.module.css"

export const ProfileNav= () => {
    const dispatch = useAppDispatch();
    const onLogOut = () => {
        dispatch(logoutUser())
    }

    return (
        <div className={`${StyleProfile.calculations} mt-25`}>
            <NavLink  to={'/profile'} exact={true} className={`${StyleProfile.link} text text_type_main-medium`} activeClassName={StyleProfile.link_active}>Профиль</NavLink>
            <NavLink  to={'/profile/orders'} exact={true} className={`${StyleProfile.link} text text_type_main-medium`} activeClassName={StyleProfile.link_active}>История заказов</NavLink>
            <NavLink  to={'/login'} onClick={onLogOut} className={`${StyleProfile.link} text text_type_main-medium`}>Выход</NavLink>
            <p className={"text text_type_main-default text_color_inactive"}>В этом разделе вы можете
                изменить свои персональные данные</p>
        </div>
    )
}