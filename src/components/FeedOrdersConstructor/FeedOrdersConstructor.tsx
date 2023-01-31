import React from "react";
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './FeedOrdersConstructor.module.css'


export const FeedOrdersConstructor = () => {

    return (
        <div className={`${styles.container} pt-6 pl-6 pr-6 pb-6`}>
            <div className={`${styles.orderDetails}`}>
                <p className={`${styles.orderId} text text_type_digits-default`}>#034535</p>
                <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20</p>
            </div>
            <p className={`${styles.nameBurger} text text text_type_main-medium mt-6`}>Death Star Starship Main
                бургер</p>
            <div className={`${styles.burgerInfo} mt-6`}>
                <div className={styles.burgerIngredients}></div>
                <div className={styles.priceBurger}>
                    <p className={`text text text_type_main-medium`}>480</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}