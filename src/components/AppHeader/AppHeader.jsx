import React from "react";
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './AppHaeder.module.css';
import {NavLink, useLocation} from "react-router-dom";

export const AppHeader = () => {
    const location = useLocation();
    return (
        <header className={`${headerStyles.header} mt-10 pt-4`}>
            <nav className={`${headerStyles.headerSection}`}>
                <NavLink  to='/' exact={true} className={`${headerStyles.link} ${headerStyles.linkConstructor}`} activeClassName={headerStyles.activeLink}>Конструктор
                    <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                </NavLink>
                <NavLink to='/feed' className={`${headerStyles.link} ${headerStyles.linkOrder}`} activeClassName={headerStyles.activeLink}>Лента заказов
                    <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'}/>
                </NavLink>
                <div><Logo/></div>
                <NavLink to='/profile' className={`${headerStyles.link} ${headerStyles.linkAccount}`} activeClassName={headerStyles.activeLink}>Личный кабинет
                    <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'}/>
                </NavLink>
            </nav>
        </header>
    )
}