import React from "react";
import {FeedOrdersConstructor} from "../FeedOrdersConstructor/FeedOrdersConstructor";
import styles from './FeedOrders.module.css'
import {useAppSelector} from "../../types/typesDataProduct";
import { Link, useLocation } from "react-router-dom";

export const FeedOrders = () => {
    const {data} = useAppSelector(store => store.historyAll);
    const orders = data?.orders;
    const location = useLocation();
    return (

        <div className={styles.container}>
            {orders?.map((order) => (
                <Link
                    key={order.number}
                    to={{
                        pathname: `/feed/${order.number}`,
                        state: { background: location }
                    }}
                    className={styles.link}
                >
                <FeedOrdersConstructor order={order} key={order.number}/>
                </Link>
            ))}

        </div>

    )
}