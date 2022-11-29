import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHaeder.module.css';

export class AppHeader extends React.Component {
    render() {
        return (
            <header className={`${headerStyles.header} p-10`}>
                <div className={`${headerStyles.headerSection}`}>
                    <button className={`${headerStyles.btn} ${headerStyles.btnConstructor} pl-5 pr-5 mr-2`}>Конструктор
                        <BurgerIcon type="primary" />
                    </button>
                    <button className={`${headerStyles.btn} ${headerStyles.btnOrder} pl-5 pr-5 mr-30`}>Лента заказов
                        <ListIcon type="primary" />
                    </button>
                </div>
                <Logo />
                <button className={`${headerStyles.btn} ${headerStyles.btnAccount} pl-5 pr-5`}>Личный кабинет
                    <ProfileIcon type="primary" />
                </button>
            </header>
        )
    }
}