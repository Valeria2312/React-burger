import React from "react";
import styles from './order-feed.module.css'
import {FeedOrdersDetails} from "../../components/FeedOrdersDetails/FeedOrdersDetails";
import {FeedOrders} from "../../components/FeedOrders/FeedOrders";


export const OrderFeed = () => {

    return(
        <div >
            <h2 className={`${styles.containerHeader} text text_type_main-large mt-10 mb-5`}>Лента заказов</h2>
            <div className={styles.container}>
                <FeedOrders/>
                <FeedOrdersDetails/>
            </div>

        </div>
    )
}