import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHaeder.module.css';
import {Link} from "react-router-dom";

export const AppHeader = () => {
    return (
        <header className={`${headerStyles.header} mt-10 pt-4`}>
            <div className={`${headerStyles.headerSection}`}>
                <Link  to='/' className={`${headerStyles.btn} ${headerStyles.btnConstructor} mr-2`}>Конструктор
                    <BurgerIcon type="secondary"/>
                </Link>
                <Link to='/profile/orders' className={`${headerStyles.btn} ${headerStyles.btnOrder} mr-30`}>Лента заказов
                    <ListIcon type="secondary"/>
                </Link>
            </div>
            <Logo/>
            <Link to='/profile' className={`${headerStyles.btn} ${headerStyles.btnAccount} `}>Личный кабинет
                <ProfileIcon type="secondary"/>
            </Link>
        </header>
    )
}