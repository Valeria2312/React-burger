import styles from "./FeedOrdersDetails.module.css";
import React from "react";
import {useAppSelector} from "../../types/typesDataProduct";

export const FeedOrdersDetails = () => {
    const {data} = useAppSelector(store => store.historyAll);

    let ordersDone: Array<number> = [];
    let ordersAtWork: Array<number> = [];

        data?.orders
            .forEach((order) => {
                if (order.status === 'done') {
                    ordersDone.push(order.number);
                } else if (order.status === 'pending') {
                    ordersAtWork.push(order.number)
                    console.log(ordersAtWork)
                }
            });

    return (
        <>
            {data ? (
            <div className={styles.container}>
                <div className={`${styles.containerOrders} mb-15`}>
                    <div className={`${styles.ordersHeader} text text text_type_main-medium pb-6`}>Готовы:
                        <div className={styles.ordersContainer}>
                            {ordersDone && ordersDone.map((order, index) => {
                                if (index < 10) {
                                    return <div className={`${styles.orders} ${styles.ordersDone}`} key={index}>{order}</div>;
                                }
                                else return null;
                            })}
                        </div>
                    </div>
                    <div className={`${styles.ordersHeader} text text text_type_main-medium pb-6`}>В работе:
                        <div className={styles.ordersContainer}>
                            {ordersAtWork && ordersAtWork.map((order, index) => {
                                if (index < 10) {
                                    return <div className={`${styles.orders} ${styles.ordersAtWork}`} key={index}>{order}</div>;
                                }
                                else return null;
                            })}
                        </div>
                    </div>
                </div>
                <div className={`${styles.totalOrders} text text text_type_main-medium pb-6`}>Выполнено за все время:
                    <div className={`text text_type_digits-large`}>{data.total}
                    </div>
                </div>
                <div className={`${styles.totalOrders} text text text_type_main-medium`}>Выполнено за сегодня:
                    <div className={`text text_type_digits-large`}>{data.totalToday}
                    </div>
                </div>
            </div>
        ) : null}
        </>

    )
}

