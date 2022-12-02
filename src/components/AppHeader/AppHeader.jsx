import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHaeder.module.css';

export const AppHeader = () => {
        return (
            <header className={`${headerStyles.header} mt-10 pt-4`}>
                <div className={`${headerStyles.headerSection}`}>
                    <a href="#" className={`${headerStyles.btn} ${headerStyles.btnConstructor} mr-2`}>Конструктор
                        <BurgerIcon type="secondary" />
                    </a>
                    <a href="#" className={`${headerStyles.btn} ${headerStyles.btnOrder} mr-30`}>Лента заказов
                        <ListIcon type="secondary" />
                    </a>
                </div>
                <Logo />
                <a href="#" className={`${headerStyles.btn} ${headerStyles.btnAccount} `}>Личный кабинет
                    <ProfileIcon type="secondary" />
                </a>
            </header>
        )
}