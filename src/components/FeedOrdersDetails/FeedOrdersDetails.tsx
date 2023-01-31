import styles from "./FeedOrdersDetails.module.css";
import React from "react";

export const FeedOrdersDetails = () => {

    return (
        <div className={styles.container}>
            <div className={`${styles.containerOrders} mb-15`}>
                <div className={`${styles.ordersHeader} text text text_type_main-medium pb-6`}>Готовы:
                    <div className={`${styles.orders} ${styles.ordersDone}`}></div>
                </div>
                <div className={`${styles.ordersHeader} text text text_type_main-medium pb-6`}>В работе:
                    <div className={`${styles.orders} ${styles.ordersAtWork}`}></div>
                </div>
            </div>
            <div className={`${styles.totalOrders} text text text_type_main-medium pb-6`}>Выполнено за все время:
                <div className={`text text_type_digits-large`}>28 752
                </div>
            </div>
            <div className={`${styles.totalOrders} text text text_type_main-medium`}>Выполнено за сегодня:
                <div className={`text text_type_digits-large`}>138
                </div>
            </div>
        </div>
    )
}