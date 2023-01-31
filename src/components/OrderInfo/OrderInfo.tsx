import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./OrderInfo.module.css"

export const OrderInfo = () => {

    return (
        <div className={`${styles.container} pt-6 pl-6 pr-6 pb-6`}>
            <div className={`${styles.orderDetails}`}>
                <p className={`${styles.orderId} text text_type_digits-default mb-10`}>#034535</p>
            </div>
            <p className={`${styles.nameBurger} text text text_type_main-medium`}>Death Star Starship Main бургер</p>
            <p className={`${styles.burgerStatus} text text_type_main-default mt-3`}>Выполнен</p>
            <div className={`${styles.burgerInfo} mt-6`}>
                <p className={`${styles.burgerIngredientsHeader} text text_type_main-large mt-15 pb-6`}>Состав:</p>
                <div className={styles.burgerIngredients}></div>
            </div>
            <div className={`${styles.price} mt-10`}>
                <p className={`${styles.timestamp} text text_type_main-small text_color_inactive`}>Сегодня, 16:20</p>
                <div className={`${styles.priceBurger}`}>
                    <p className={`text text text_type_main-medium`}>480</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}